export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    active: number;
};

export type Message = {
  role: "user" | "assistant";
  content: string;
};