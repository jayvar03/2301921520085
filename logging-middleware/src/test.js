import { configure, Log } from "./index.js";

configure({ apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpMjMwNjlAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDYwMjI5LCJpYXQiOjE3ODI0NTkzMjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0MjcyZmVjNC0wNTdhLTRlMDgtYTY3Mi0xNDBlNzA3ZDNiYmIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJqYXkgdmFyc2huZXkiLCJzdWIiOiIwNzQyZjM4OC0wN2I1LTQ5NjMtOWRiMy1iMDQzZTU2YzVhMzgifSwiZW1haWwiOiJjc2FpMjMwNjlAZ2xiaXRtLmFjLmluIiwibmFtZSI6ImpheSB2YXJzaG5leSIsInJvbGxObyI6IjIzMDE5MjE1MjAwODUiLCJhY2Nlc3NDb2RlIjoieHhrSm5rIiwiY2xpZW50SUQiOiIwNzQyZjM4OC0wN2I1LTQ5NjMtOWRiMy1iMDQzZTU2YzVhMzgiLCJjbGllbnRTZWNyZXQiOiJYTVRqckhHa2dwU1hkcURlIn0.oErb1waXUkbjx6LsqfIjaRnSeCa1MlHSVdxEgqSrZsA" });

const r1 = await Log("BACKEND", "error", "handler", "bad casing");
console.log("Invalid stack (expect null):", r1);

const r2 = await Log("backend", "info", "component", "wrong pkg");
console.log("Frontend pkg on backend (expect null):", r2);

const r3 = await Log("backend", "error", "handler", "received string, expected bool");
console.log("Real log result:", r3);

const r4 = await Log("backend", "fatal", "db", "Critical database connection failure.");
console.log("Real log result:", r4);