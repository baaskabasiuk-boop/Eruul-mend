import React, { useState, useMemo } from "react";
import { Leaf, ShoppingBag, X, Plus, Minus, Search, Star } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Витамин D3 + K2",
    category: "Витамин",
    price: 45000,
    unit: "60 капсул",
    rating: 4.8,
    tag: "Их зарагддаг",
    blurb: "Ясны эрүүл мэнд, дархлаанд туслах өдөр тутмын хэрэглээ",
  },
  {
    id: 2,
    name: "Омега-3 загасны тос",
    category: "Витамин",
    price: 52000,
    unit: "90 капсул",
    rating: 4.7,
    tag: null,
    blurb: "Зүрх, тархины эрүүл мэндэд зориулсан цэвэр тос",
  },
  {
    id: 3,
    name: "Магни цитрат",
    category: "Витамин",
    price: 38000,
    unit: "60 таблетка",
    rating: 4.6,
    tag: null,
    blurb: "Булчин, мэдрэлийн тогтолцоог тайвшруулна",
  },
  {
    id: 4,
    name: "Пробиотик 20 тэрбум",
    category: "Г
