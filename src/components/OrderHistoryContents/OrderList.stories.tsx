import { Meta, StoryFn } from "@storybook/react";
import OrderList from "./OrderList";
import { PageDTO } from "@/lib/types/PageDTO";
import { OrderDTO } from "@/lib/types/OrderDTO";
import { OrderStatus } from "@/lib/types/OrderStatusDTO";

export default {
  title: "Components/OrderList",
  component: OrderList,
} as Meta<typeof OrderList>; // OrderList 컴포넌트에 대한 타입 명시

const mockOrderData: OrderDTO[] = [
  {
    orderId: 1,
    customerEmail: "customer@example.com",
    orderCreatedAt: "2025-01-01T12:00:00Z",
    orderStatus: "주문 완료" as OrderStatus,
    totalPrice: 10000,
    orderDetails: [
      {
        product: {
          productId: 101,
          productName: "커피 원두",
          productDescription: "맛있는 커피 원두",
          productPrice: 5000,
          productImageURL: "/images/coffeebean.jpg",
          productStock: 50,
        },
        productQuantity: 2,
        orderDetailId: 0,
        orderPrice: 0,
      },
    ],
    address: {
      baseAddress: "서울시 강남구",
      detailAddress: "역삼동 123-45",
      zipCode: "12345",
    },
    delivery: {
      deliveryId: 1,
      deliveryNumber: "DEL123456",
      deliveryCompany: "CJ대한통운",
      orderId: 1,
    },
  },
  {
    orderId: 2,
    customerEmail: "customer2@example.com",
    orderCreatedAt: "2025-01-02T14:00:00Z",
    orderStatus: "주문 취소" as OrderStatus,
    totalPrice: 20000,
    orderDetails: [
      {
        product: {
          productId: 102,
          productName: "아이스 아메리카노",
          productDescription: "시원한 아메리카노",
          productPrice: 10000,
          productImageURL: "/images/americano.jpg",
          productStock: 30,
        },
        productQuantity: 2,
        orderDetailId: 0,
        orderPrice: 0,
      },
    ],
    address: {
      baseAddress: "서울시 송파구",
      detailAddress: "잠실동 67-89",
      zipCode: "23456",
    },
    delivery: {
      deliveryId: 2,
      deliveryNumber: "DEL987654",
      deliveryCompany: "우체국",
      orderId: 2,
    },
  },
];

const mockPageDTO: PageDTO<OrderDTO> = {
  items: mockOrderData,
  totalPages: 1,
  currentPageNumber: 1,
  pageSize: 10,
  totalItems: mockOrderData.length,
};

// Template에서 args를 받도록 타입을 명시적으로 지정합니다.
const Template: StoryFn<typeof OrderList> = (args) => <OrderList {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  orderPage: null,
  loading: true,
  email: "customer@example.com",
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  orderPage: { ...mockPageDTO, items: [] },
  loading: false,
  email: "customer@example.com",
};

export const WithOrders = Template.bind({});
WithOrders.args = {
  orderPage: mockPageDTO,
  loading: false,
  email: "customer@example.com",
};
