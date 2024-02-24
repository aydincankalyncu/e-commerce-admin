export const REST_URL = "http://localhost:3000";
export const ACCESS_TOKEN = "token";
export const KEY_USER_EMAIL = "Email";

export enum OrderStatus {
    Pending     = 0,
    Approved    = 1,
    Preparing   = 2,
    Shipping    = 3
}

export const OrderStatusInfo = [
    {text: "Pending",   value: OrderStatus.Pending      },
    {text: "Approved",  value: OrderStatus.Approved     },
    {text: "Preparing", value: OrderStatus.Preparing    },
    {text: "Shipping",  value: OrderStatus.Shipping     }
]