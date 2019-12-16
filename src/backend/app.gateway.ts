import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@WebSocketGateway(3333)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  @WebSocketServer()
  wss;
  clients = [];
  players = [];
  host = 0;

  handleConnection(client: any, ...args): any {
    this.clients.push(client);
    client.emit('players', this.players);
    client.emit('host_existed', this.host);
  }

  handleDisconnect(client: any): any {
    const playerIndex = this.players.findIndex(player => player.id === client.playerID);
    if (playerIndex >= 0) {
      this.players[playerIndex].status = false;
      this.broadcast('disconnected', client.playerID);
    }
    this.clients = this.clients.filter(existedClient => existedClient.id !== client.id);
  }

  @SubscribeMessage('connected')
  handleConnected(client: any, payload: number) {
    const index = this.players.findIndex(player => player.id === Number(payload));
    if (index >= 0 && !this.players[index].status) {
      client.playerID = this.players[index].id;
      this.players[index].status = true;
      this.broadcast('reconnected', this.players[index].id);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: any, payload: number) {
    if (this.players.find(player => player.id === Number(payload))) {
      client.emit('joined', true);
    } else {
      this.userModel.findOne(payload).then((user) => {
        const newbie = (({ id, name }) => ({ id, name, status: true }))(user);
        client.playerID = newbie.id;
        this.players.push(newbie);
        this.broadcast('newbie', newbie);
      });
    }
  }

  @SubscribeMessage('host')
  handleHost(client: any, payload: number) {
    this.host = client;
    client.playerID = payload;
    this.broadcast('host_existed', payload);
  }

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (const client of this.clients) {
      client.emit(event, broadCastMessage);
    }
  }
}
