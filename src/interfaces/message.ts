export class SocketMessageTypes {
  public static GAME = 'game';
  public static PLAYER = 'player';
  public static SOLUTION = 'solution';
}

export interface ISocketMessage {
  type: string;
  body: any;
}
