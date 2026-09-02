import heroImage from "./hero.jpg";
import asus_01 from "./asus-01.png";
import asus_02 from "./asus-02.png";
import asus_03 from "./asus-03.png";
import asus_04 from "./asus-04.png";

import hp_01 from "./hp-01.png";
import zephyrus_01 from "./zephyrus-01.png";

import lenovo_01 from "./lenovo-01.png";
import lenovo_02 from "./lenovo-02.png";
import lenovo_03 from "./lenovo-03.png";
import lenovo_04 from "./lenovo-04.png";

import person_01 from "./person-01.jpg";
import person_02 from "./person-02.jpg";
import person_03 from "./person-03.jpg";

import discountImage from "./discount.jpg";
import newsletterImage from "./newsletter.png";
import aboutusImage from "./aboutus.png";

import hero_svg from "./hero_svg.svg";
import hero_svg_1 from "./hero_svg_01.svg";
import hero_svg_2 from "./hero_svg_02.svg";
import add_address_img from "./add_address.svg";
import signup_image from "./signup_svg.svg";
import user_avator from "./user_avator.svg"

const products = [
  {
    _id: "SCT001",
    image: [asus_01],
    name: "ASUS Zenbook Duo (2025)",
    category: "asus",
    price: 30345,
    offerPrice: 29050,
    description: [
      "Processor Intel Core Ultra 9 285H",
      "Graphics Intel Arc Graphics",
      "Display Dual 14-inch 3K OLED Touch Displays",
      "RAM 32GB",
      "Storage 2TB SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
  {
    _id: "SCT002",
    image: [asus_02],
    name: "ASUS Zenbook A14 OLED",
    category: "asus",
    price: 19200,
    offerPrice: 16000,
    description: [
      "Processor Qualcomm Snapdragon X X1 26-100",
      "Graphics Integrated",
      "Display 14-inch WUXGA OLED",
      "RAM 16GB",
      "Storage 512GB SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
  {
    _id: "SCT003",
    image: [asus_03],
    name: "ASUS ZenBook 14",
    category: "asus",
    price: 18500,
    offerPrice: 15300,
    description: [
      "Processor AMD Ryzen AI 7 350",
      "Graphics AMD Radeon Graphics",
      "Display 14-inch 3K OLED 120Hz",
      "RAM 16GB",
      "Storage 1TB SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
  {
    _id: "SCT004",
    image: [asus_04],
    name: "ASUS Zenbook 14 OLED",
    category: "asus",
    price: 24500,
    offerPrice: 19500,
    description: [
      "Processor Intel Core Ultra 9 285H",
      "Graphics Intel Arc Graphics",
      "Display 14-inch 3K OLED Touch Display",
      "RAM 16GB",
      "Storage 1TB SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
  {
    _id: "SCT005",
    image: [zephyrus_01],
    name: "ROG Zephyrus G16 (2025)",
    category: "zephyrus",
    price: 45400,
    offerPrice: 41400,
    description: [
      "Processor Intel Core Ultra 9 285H",
      "Graphics NVIDIA GeForce RTX 5070 Ti Laptop GPU",
      "Display 16-inch 2.5K WQXGA OLED ROG Nebula Display",
      "RAM 32GB",
      "Storage 1TB SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
  {
    _id: "SCT006",
    image: [lenovo_01],
    name: "Lenovo Legion 5",
    category: "lenovo",
    price: 28000,
    offerPrice: 22000,
    description: [
      "Processor Intel Core i7-14650HX",
      "Graphics NVIDIA GeForce RTX 4060 8GB",
      "Display 16-inch WQXGA 165Hz",
      "RAM 16GB",
      "Storage 1TB SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
  {
    _id: "SCT007",
    image: [lenovo_02],
    name: "Lenovo LOQ 15IRH8",
    category: "lenovo",
    price: 24500,
    offerPrice: 19500,
    description: [
      "Processor Intel Core i7-13620H",
      "Graphics NVIDIA GeForce RTX 4050 6GB",
      "Display 15.6-inch FHD 144Hz",
      "RAM 16GB",
      "Storage 512GB SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
  {
    _id: "SCT008",
    image: [hp_01],
    name: "HP Spectre x360 2-in-1",
    category: "hp",
    price: 14800,
    offerPrice: 12000,
    description: [
      "Processor Intel Core i5-1235U",
      "Graphics Intel Iris Xe Graphics",
      "Display 13.5-inch WUXGA+ Touchscreen",
      "RAM 8GB LPDDR4x",
      "Storage 512GB PCIe Gen4 SSD",
      "Operating_system Windows 11 Home",
    ],
    inStock: true,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Brian Mwangi",
    role: "Software developer",
    review:
      "“SmartCore’\s laptop handles my coding tools and multitasking\
                effortlessly. Fast, reliable, and perfect for serious\
                development work.”",
    image: person_01,
    rating: 5,
  },
  {
    id: 2,
    name: "Aisha Kamau",
    role: "University student",
    review:
      "“I needed something powerful and affordable, and SmartCore\
                delivered. It runs all my programming tools smoothly and lasts\
                all day.”",
    image: person_03,
    rating: 4,
  },
  {
    id: 3,
    name: "Daniel otieno",
    role: "Graphic Designer",
    review:
      " “Designing feels seamless on my SmartCore laptop. Great\
                performance, smooth rendering, and truly professional quality.”",
    image: person_02,
    rating: 5,
  },
];

const categories = [
  {
    text: "hp Laptops",
    path: "hp",
    image: hp_01,
    bgColor: "#1e293b",
  },
  {
    text: "Lenovo Laptops",
    path: "lenovo",
    image: lenovo_03,
    bgColor: "#1e293b",
  },
  {
    text: "Asus Laptops",
    path: "asus",
    image: asus_02,
    bgColor: "#1e293b",
  },
  {
    text: "Zephyrus Laptops",
    path: "zephyrus",
    image: zephyrus_01,
    bgColor: "#1e293b",
  },
];

const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: products[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: products[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: products[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];

export {
  hp_01,
  asus_01,
  asus_02,
  asus_03,
  asus_04,
  hero_svg,
  products,
  person_01,
  person_02,
  person_03,
  lenovo_01,
  lenovo_02,
  lenovo_03,
  heroImage,
  categories,
  hero_svg_2,
  hero_svg_1,
  dummyOrders,
  dummyAddress,
  aboutusImage,
  signup_image,
  testimonials,
  discountImage,
  add_address_img,
  newsletterImage,
  user_avator
};
