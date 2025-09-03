import io from "socket.io-client";
import { BASE_URL } from "./Constants";

export const createSocketConnection = () =>{
    return io(BASE_URL);
}