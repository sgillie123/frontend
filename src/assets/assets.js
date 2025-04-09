import cart from './images/cart.jpg';
import trash from './images/trash.jpg';
import search from './images/search.png';
import choc_cake from './images/choc_cake.jpg';
import choco_cupcake from './images/choco_cupcake.jpg';
import chocolate_chip from './images/chocolate_chip.jpg';
import doublechoc_cookie from './images/doublechoc_cookie.jpg';
import mnm_cookies from './images/mnm_cookies.jpg'; 
import oatmeal from './images/oatmeal.jpg';
import pound_cake from './images/pound_cake.jpg';
import red_velvet_cookie from './images/red_velvet_cookie.jpg';
import str_cake from './images/str_cake.jpg';
import strawberry_cupcake from './images/strawberry_cupcake.jpg';
import van_cake from './images/van_cake.jpg';
import menu from './images/menu.png';
import white_cookie from './images/white_cookie.jpg'
import vcupcake from './images/vcupcake.jpg';
import logo from './images/logo.png';
import profile from './images/profile.jpg';
import hero from './images/hero.jpg';
import exchange from './images/exchange.jpg';
import check from './images/check.png';
import headphones from './images/headphones.jpg';
import dropdown from './images/dropdown.png';
import cross from './images/cross.jpg';
import star_icon from './images/star_icon.jpg';
import stripe from './images/stripe.jpg';
import paypal from './images/paypal.jpg';
import visa from './images/visa.jpg';
import about from './images/about.jpg';
import contact from './images/contact.jpg';
import snickerdoodle from './images/snickerdoodle.jpg';
import blueberry from './images/blueberry.jpg';
import banana from './images/banana.jpg';
import peanut from './images/peanut.jpg';
import brownie from './images/brownie.jpg';
import choco_muffin from './images/choco_muffin.jpg';
import plain from './images/plain.jpg';
import chipmuff from './images/chipmuff.jpg';



export const assets = {
    cart,
    blueberry,
    banana,
    peanut,
    brownie,
    chipmuff,
    choco_muffin,
    plain,
    chipmuff,
    contact,
    snickerdoodle,
    paypal,
    about,
    visa,
    exchange,
    dropdown,
    profile,
    menu,
    headphones,
    check,
    hero,
    search,
    logo,
    trash,
    choc_cake,
    vcupcake,
    choco_cupcake,
    chocolate_chip,
    doublechoc_cookie,
    mnm_cookies,
    oatmeal,
    pound_cake,
    red_velvet_cookie,
    str_cake,
    strawberry_cupcake,
    van_cake,
    white_cookie,
    cross,
    star_icon,
    stripe
    
};

export const products = [
    {
        _id: '1',
        name: 'Chocolate Chip Cookies',
        description: 'Classic chocolate chip cookies with a chewy center.',
        price: 2.50,
        image: [chocolate_chip],
        category: 'cookies',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: true
    },
    {
        _id: '2',
        name: 'M&M Cookies',
        description: 'A sweet cookie and gooey with M&Ms.',
        price: 2.50,
        image: [mnm_cookies],
        category: 'cookies',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '3',
        name: 'Double Chocolate Chip Cookies',
        description: 'A rich and indulgent cookie packed with double the chocolate.',
        price: 2.50,
        image: [doublechoc_cookie],
        category: 'cookies',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '4',
        name: 'Red Velvet Cookies',
        description: 'A soft, cocoa-kissed red cookie with a rich buttery flavor.',
        price: 2.50,
        image: [red_velvet_cookie],
        category: 'other',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '5',
        name: 'White Macadamia Nut Cookies',
        description: 'Buttery, crisp cookies filled with crunchy, with rich white macadamia nuts .',
        price: 2.50,
        image: [white_cookie],
        category: 'cookies',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '6',
        name: 'Oatmeal Raisin Cookies',
        description: 'Chewy, sweet, cinnamon-spiced oatmeal raisin delight.',
        price: 2.50,
        image: [oatmeal],
        category: 'cookies',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '7',
        name: 'Vanilla Cupcakes',
        description: 'Light, fluffy, sweet vanilla cupcake with creamy frosting.',
        price: 4,
        image: [vcupcake],
        category: 'cupcakes',
        subCategory: 'vanilla',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: true
    },
    {
        _id: '8',
        name: 'Chocolate Cupcakes',
        description: 'Rich, moist, decadent chocolate cupcake with smooth frosting.',
        price: 4,
        image: [choco_cupcake],
        category: 'cupcakes',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: true
    },
    {
        _id: '9',
        name: 'Strawberry Cupcakes',
        description: 'Sweet, light, fruity strawberry cupcake with creamy frosting.',
        price: 4,
        image: [strawberry_cupcake],
        category: 'cupcakes',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '10',
        name: 'Vanilla Cake',
        description: 'Light, airy, and moist vanilla cake with a delicate, sweet flavor that melts in your mouth.',
        price: 30,
        image: [van_cake],
        category: 'cakes',
        subCategory: 'vanilla',
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '11',
        name: 'Chocolate Cake',
        description: 'Rich, decadent, and moist chocolate cake with a perfectly smooth, velvety finish.',
        price: 30,
        image: [choc_cake],
        category: 'cakes',
        subCategory: 'chocolate',
        date: '2025-03-30',
        bestseller: true
    },
    {
        _id: '12',
        name: 'Strawberry Cake',
        description: 'Fresh, fruity, and moist strawberry cake with a delicate, sweet flavor and a luscious finish.',
        price: 35,
        image: [str_cake],
        category: 'cakes',
        subCategory: 'other',
        date: '2025-03-30',
        bestseller: true
    },
    {
        _id: '13',
        name: 'Pound cake',
        description: 'Dense, buttery, and moist pound cake with a rich, comforting flavor in every bite.',
        price: 30,
        image: [pound_cake],
        category: 'cakes',
        subCategory: 'other',
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '14',
        name: 'Snickerdoodle cookies',
        description: 'Buttery, crisp cookies filled with crunchy, with rich white macadamia nuts .',
        price: 2.50,
        image: [snickerdoodle],
        category: 'cookies',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '15',
        name: 'Peanut butter cookies',
        description: 'Buttery, crisp cookies filled with crunchy, with rich white macadamia nuts .',
        price: 2.50,
        image: [peanut],
        category: 'cookies',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '16',
        name: 'Brownies',
        description: 'Buttery, crisp cookies filled with crunchy, with rich white macadamia nuts .',
        price: 2.50,
        image: [brownie],
        category: 'cookies',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: true
    },
    {
        _id: '17',
        name: 'Banana Nut muffins',
        description: 'Sweet, light, fruity strawberry cupcake with creamy frosting.',
        price: 5,
        image: [banana],
        category: 'muffins',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '18',
        name: 'Chocolate muffins',
        description: 'Sweet, light, fruity strawberry cupcake with creamy frosting.',
        price: 5,
        image: [choco_muffin],
        category: 'muffins',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '19',
        name: 'Chocolate Chip muffins',
        description: 'Sweet, light, fruity strawberry cupcake with creamy frosting.',
        price: 5,
        image: [chipmuff],
        category: 'muffins',
        subCategory: 'chocolate',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: true
    },
    {
        _id: '20',
        name: 'Plain muffins',
        description: 'Sweet, light, fruity strawberry cupcake with creamy frosting.',
        price: 5,
        image: [plain],
        category: 'muffins',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: false
    },
    {
        _id: '21',
        name: 'Blueberry muffins',
        description: 'Sweet, light, fruity strawberry cupcake with creamy frosting.',
        price: 5,
        image: [blueberry],
        category: 'muffins',
        subCategory: 'other',
        sizes: ["One","Half Dozen", "Dozen"],
        date: '2025-03-30',
        bestseller: true
    },
    
];