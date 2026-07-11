import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

// Dish catalog details mapped from MenuCustomizer catalog
export interface DishItem {
  id: string;
  name: string;
  category: string;
  slot: "breakfast" | "brunch" | "lunch" | "snacks" | "dinner";
  isVeg: boolean;
  price: string;
  desc?: string;
  tag?: string;
}

export const ALL_DISHES: DishItem[] = [
  // MORNING BREAKFAST
  { id: "b1", name: "Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Soft & fluffy steamed rice cakes" },
  { id: "b2", name: "Chilli Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Tossed in spicy Capsicum masala" },
  { id: "b3", name: "Garlic Podi Idly Fry", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Crispy fried with Poondu Podi & Ghee" },
  { id: "b4", name: "Kancheepuram Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Tempered with pepper, cumin & cashews" },
  { id: "b5", name: "Mini Ghee Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Served floating in hot Sambar with Pure Ghee", tag: "Bestseller" },
  { id: "b6", name: "Kushboo Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Ultra soft hotel-style idlies" },
  { id: "b7", name: "Medu Vada", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Crispy lentil donut with ginger & pepper" },
  { id: "b8", name: "Ven Pongal", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Pure Ghee pepper cashew rice pongal", tag: "Must Have" },
  { id: "b9", name: "Ghee Roast Dosa", category: "Dosa Varieties", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Golden thin crispy roast in pure cow ghee" },
  { id: "b10", name: "Poori Masala", category: "Poori & Tiffin", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Puffy fried poori with yellow potato masala" },
  { id: "b11", name: "Hotel Sambar", category: "Sides & Chutneys", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Aromatic shallot & drumstick sambar" },
  { id: "b12", name: "Coconut Chutney", category: "Sides & Chutneys", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Fresh coconut chutney with mustard tempering" },
  { id: "b13", name: "Kara Chutney", category: "Sides & Chutneys", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Spicy onion tomato red chutney" },
  { id: "b14", name: "Degree Filter Coffee", category: "Hot Drinks", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Traditional Kumbakonam Filter Coffee in brass dabba", tag: "Signature" },

  // BRUNCH
  { id: "br1", name: "Lemon Rice", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Tangy tempered lemon rice with peanuts" },
  { id: "br2", name: "Curd Rice with Fruits", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Creamy curd rice garnished with pomegranate & grapes" },
  { id: "br3", name: "Bisibelabath", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Hot lentil rice with ghee, cashews & veggies" },
  { id: "br4", name: "Coconut Rice", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Tempered fresh coconut rice with cashews" },
  { id: "br5", name: "Potato Kara Curry", category: "Add-ons", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Spicy roasted potato fry" },

  // LUNCH
  { id: "l1", name: "Elaneer Payasam", category: "Payasam & Sweets", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Tender coconut flesh with condensed milk & cardamom", tag: "MCC Special" },
  { id: "l2", name: "Traditional Mysurpa", category: "Payasam & Sweets", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Melt-in-mouth pure ghee Mysurpa" },
  { id: "l3", name: "Arachu Vitta Sambar", category: "Main Gravies", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Freshly roasted spice blend Sambar" },
  { id: "l4", name: "Kalyana Vathakulambu", category: "Main Gravies", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Tangy Sundakkai & Manathakkali vathakulambu" },
  { id: "l5", name: "Poondu Rasam", category: "Rasam", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Aromatic garlic pepper rasam" },
  { id: "l6", name: "Urulai Podi Roast", category: "Poriyal & Kootu", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Baby potatoes roasted in Chettinad podi" },
  { id: "l7", name: "Special Vegetable Avial", category: "Poriyal & Kootu", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Traditional Kerala style coconut veggie avial" },
  { id: "l8", name: "Vazhaipoo Poriyal", category: "Poriyal & Kootu", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Healthy banana flower coconut fry" },
  { id: "l9", name: "Seeraga Samba Veg Biryani", category: "Biryani & Rice", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Fragrant Seeraga Samba rice dum biryani" },
  { id: "l10", name: "Curd Rice with Mango Pickle", category: "Rice & Extras", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Thick curd rice with homemade vadu mangai" },
  { id: "l11", name: "Thala Vazhai Ela & Appalam", category: "Leaf Extras", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Fresh tender Tanjore banana leaf & crunchy appalam" },

  // EVENING SNACKS
  { id: "s1", name: "Chettinad Onion Pakoda", category: "Snacks", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Crispy fried sliced onion fritters" },
  { id: "s2", name: "Mysore Bonda", category: "Snacks", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Crispy soft maida bonda with coconut chutney" },
  { id: "s3", name: "Mini Vegetable Cutlet", category: "Starters", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Golden breaded spiced potato beetroot cutlet" },
  { id: "s4", name: "Paneer 65", category: "Starters", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Crispy spiced cottage cheese cubes" },
  { id: "s5", name: "Sukku Malli Tea", category: "Hot Drinks", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Healthy ginger coriander herbal tea" },
  { id: "s6", name: "Fresh Watermelon Juice", category: "Cold Beverages", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Chilled natural fruit juice" },

  // DINNER
  { id: "d1", name: "Soft Idiyappam", category: "Dinner Mains", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Steamed string hoppers with sweetened Coconut Milk" },
  { id: "d2", name: "Ceylon Veg Coin Parotta", category: "Dinner Mains", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Flaky mini parottas served with Veg Salna" },
  { id: "d3", name: "Paneer Butter Masala", category: "Gravies", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Rich creamy tomato gravy with paneer" },
  { id: "d4", name: "Ghee Rice", category: "Biryani & Rice", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Cashew raisin golden ghee rice" },
  { id: "d5", name: "Rasamalai", category: "Desserts", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Soft cottage cheese discs in saffron milk" },
];

export interface CartItem extends DishItem {
  qty: number;
}

interface CartContextType {
  cartItems: Record<string, number>;
  addToCart: (dishId: string, qty?: number) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, qty: number) => void;
  clearCart: () => void;
  totalCount: number;
  cartItemsList: CartItem[];
  
  // Event Details
  guestCount: number;
  setGuestCount: (val: number) => void;
  eventDate: string;
  setEventDate: (val: string) => void;
  eventType: string;
  setEventType: (val: string) => void;
  customerName: string;
  setCustomerName: (val: string) => void;
  customerPhone: string;
  setCustomerPhone: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  
  // Cost Calculations
  estimatedPricePerPlate: number;
  estimatedTotalCost: number;
  allDishes: DishItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [allDishes, setAllDishes] = useState<DishItem[]>(ALL_DISHES);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [guestCount, setGuestCount] = useState<number>(250);
  const [eventDate, setEventDate] = useState<string>("");
  const [eventType, setEventType] = useState<string>("Wedding");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Fetch live database menu items on mount
  useEffect(() => {
    const fetchDBMenu = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${base}/menu-items`);
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const getSlotForCategory = (categoryName: string): "breakfast" | "brunch" | "lunch" | "snacks" | "dinner" => {
            const cat = (categoryName || "").trim().toLowerCase();
            if (cat === "tiffin" || cat.includes("breakfast")) return "breakfast";
            if (cat === "rice items" || cat.includes("rice")) return "lunch";
            if (cat === "soup" || cat === "soups") return "dinner";
            if (cat.includes("gravy") || cat.includes("gravies")) return "dinner";
            if (cat.includes("bread") || cat.includes("roti") || cat.includes("naan")) return "dinner";
            if (cat.includes("noodles") || cat.includes("noodle")) return "dinner";
            if (cat.includes("poriyal") || cat.includes("kootu") || cat.includes("aviyal") || cat.includes("side dish")) return "lunch";
            if (cat.includes("payasam") || cat.includes("sweet") || cat.includes("sweets")) return "lunch";
            if (cat === "snacks" || cat === "starters" || cat === "starter") return "snacks";
            return "lunch";
          };

          const dbDishes: DishItem[] = result.data.map((item: any) => ({
            id: String(item.id),
            name: item.name,
            category: item.category || "General",
            slot: getSlotForCategory(item.category),
            isVeg: Boolean(item.is_veg),
            price: Number(item.price) > 0 ? `₹${item.price}` : "Price on Request",
            desc: item.description || "",
            tag: item.is_veg ? "Veg" : "Non-Veg"
          }));

          if (dbDishes.length > 0) {
            setAllDishes(dbDishes);
          }
        }
      } catch (err) {
        console.warn("Failed fetching live menu items, using fallback catalog:", err);
      }
    };
    fetchDBMenu();
  }, []);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mcc_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
      
      const storedGuests = localStorage.getItem("mcc_cart_guests");
      if (storedGuests) setGuestCount(Number(storedGuests));
      
      const storedDate = localStorage.getItem("mcc_cart_date");
      if (storedDate) setEventDate(storedDate);
      
      const storedType = localStorage.getItem("mcc_cart_type");
      if (storedType) setEventType(storedType);
      
      const storedName = localStorage.getItem("mcc_cart_name");
      if (storedName) setCustomerName(storedName);
      
      const storedPhone = localStorage.getItem("mcc_cart_phone");
      if (storedPhone) setCustomerPhone(storedPhone);
      
      const storedNotes = localStorage.getItem("mcc_cart_notes");
      if (storedNotes) setNotes(storedNotes);
    } catch (e) {
      console.warn("Failed to load cart state:", e);
    }
  }, []);

  // Save cart to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("mcc_cart", JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("mcc_cart_guests", String(guestCount));
    } catch (e) {}
  }, [guestCount]);

  useEffect(() => {
    try {
      localStorage.setItem("mcc_cart_date", eventDate);
      localStorage.setItem("mcc_cart_type", eventType);
      localStorage.setItem("mcc_cart_name", customerName);
      localStorage.setItem("mcc_cart_phone", customerPhone);
      localStorage.setItem("mcc_cart_notes", notes);
    } catch (e) {}
  }, [eventDate, eventType, customerName, customerPhone, notes]);

  const addToCart = (dishId: string, qty: number = 1) => {
    setCartItems((prev) => {
      const current = prev[dishId] || 0;
      return { ...prev, [dishId]: current + qty };
    });
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prev) => {
      const { [dishId]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateQuantity = (dishId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(dishId);
    } else {
      setCartItems((prev) => ({ ...prev, [dishId]: qty }));
    }
  };

  const clearCart = () => {
    setCartItems({});
  };

  const totalCount = useMemo(() => {
    return Object.values(cartItems).reduce((sum, q) => sum + q, 0);
  }, [cartItems]);

  const cartItemsList = useMemo(() => {
    return allDishes.filter((d) => cartItems[d.id] && cartItems[d.id] > 0).map((d) => ({
      ...d,
      qty: cartItems[d.id],
    }));
  }, [cartItems, allDishes]);

  // Premium Plate Cost Estimator:
  // Base plate cost is ₹180 (includes leaves, staff, standard items like rice/sambar/appalam/pickle)
  // Standard items: +₹25 per dish
  // Premium items (with tags or category Payasam/Sweets/Desserts): +₹45 per dish
  const estimatedPricePerPlate = useMemo(() => {
    if (cartItemsList.length === 0) return 0;
    
    let itemPremiumSum = 0;
    cartItemsList.forEach(item => {
      const isPremium = item.tag || 
                        item.category.includes("Sweets") || 
                        item.category.includes("Payasam") || 
                        item.category.includes("Dessert") ||
                        item.category.includes("Starters");
      const multiplier = item.qty || 1;
      itemPremiumSum += (isPremium ? 45 : 25) * multiplier;
    });

    // Per-plate cost is ₹150 + sum of items cost
    return 150 + itemPremiumSum;
  }, [cartItemsList]);

  const estimatedTotalCost = useMemo(() => {
    return estimatedPricePerPlate * guestCount;
  }, [estimatedPricePerPlate, guestCount]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        cartItemsList,
        guestCount,
        setGuestCount,
        eventDate,
        setEventDate,
        eventType,
        setEventType,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        notes,
        setNotes,
        estimatedPricePerPlate,
        estimatedTotalCost,
        allDishes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
