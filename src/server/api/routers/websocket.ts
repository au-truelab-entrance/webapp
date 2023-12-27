import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import io from 'socket.io-client';
import { resolve } from "path";

const SOCKET_SERVER_URL = 'http://localhost:3005';

export const websocketRouter = createTRPCRouter({

  greeting: protectedProcedure.query(async () => {

    const data = "Someone open the door";

    try {
      const socket = io(SOCKET_SERVER_URL);

      await new Promise<void>((resolve, reject) => {
        socket.on("connect", () => {
          console.log('Connected to WebSocket server')
          resolve();
        })

        socket.on("error", (error) => {
          console.error('WebSocket connection error:', error)
          reject(error);
        })
      })
      const jsonData = { message: data };
      socket.emit('message', JSON.stringify(jsonData));

      // const response: string = await new Promise<string>((resolve) => {
      //   socket.on('message', (responseData: string) => {
      //     console.log('Received message from WebSocket server:', responseData);
      //     resolve(responseData)
      //   });
      // })
      
      return data

    } catch (error) {
      console.error('WebSocket operation failed:', error);
      throw error;
    }
  }),

})
