/* 
   products.js - everything we sell lives in this one list
   For food, "ingredients" lists what's inside. For merchandise
   it holds the specs (size, material, etc).
*/

const products = [

  /* CAKES */
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    category: "cakes",
    price: 24.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/9362f7786_generated_f8289726.jpg",
    text: "Three layers of dark chocolate sponge wrapped in silky fudge frosting.",
    ingredients: "Dark chocolate (70% cocoa), butter, free-range eggs, stoneground flour, cane sugar, double cream, vanilla extract, sea salt.",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    category: "cakes",
    price: 26.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/6eb888ec4_generated_a275fc02.png",
    text: "Classic red velvet with tangy cream cheese frosting and a soft, fine crumb.",
    ingredients: "Stoneground flour, cocoa powder, buttermilk, butter, free-range eggs, cane sugar, vanilla, cream cheese, double cream.",
    badge: ""
  },
  {
    id: 3,
    name: "Lemon Drizzle Loaf",
    category: "cakes",
    price: 14.50,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/19f92959a_generated_621f9df4.png",
    text: "Zesty lemon loaf soaked in sugar syrup and finished with a crunchy glaze.",
    ingredients: "Stoneground flour, butter, free-range eggs, lemons (zest and juice), cane sugar, milk, sugar syrup.",
    badge: ""
  },

  /* PASTRIES */
  {
    id: 4,
    name: "Butter Croissant",
    category: "pastries",
    price: 4.20,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/e1cbbd234_generated_c00edc18.png",
    text: "Laminated many times over for a shatteringly flaky, buttery bite.",
    ingredients: "Stoneground flour, French-style butter (84% fat), milk, sugar, salt, yeast.",
    badge: "Fresh daily"
  },
  {
    id: 5,
    name: "Cinnamon Roll",
    category: "pastries",
    price: 5.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/8ab895f89_generated_4aa14733.png",
    text: "Soft brioche swirl baked with Ceylon cinnamon and a cream cheese drizzle.",
    ingredients: "Stoneground flour, butter, milk, brown sugar, Ceylon cinnamon, yeast, cream cheese, double cream.",
    badge: ""
  },
  {
    id: 6,
    name: "Blueberry Danish",
    category: "pastries",
    price: 5.50,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/6ef20de06_generated_38497afa.png",
    text: "Flaky pastry filled with vanilla cream and juicy blueberries.",
    ingredients: "Flaky pastry (flour, butter, milk), vanilla cream, fresh blueberries, egg wash.",
    badge: ""
  },

  /* COOKIES */
  {
    id: 7,
    name: "Chocolate Chip Cookie",
    category: "cookies",
    price: 3.20,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/66faa3529_generated_05a6ad0d.png",
    text: "A chewy centre, crisp edges and pools of melted dark chocolate.",
    ingredients: "Stoneground flour, butter, brown sugar, cane sugar, free-range egg, Belgian dark chocolate chunks, sea salt, vanilla.",
    badge: ""
  },
  {
    id: 8,
    name: "Oatmeal Raisin Cookie",
    category: "cookies",
    price: 3.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/60639646d_generated_f9974fbc.png",
    text: "Soft oat cookie with plump raisins and a hint of warm spice.",
    ingredients: "Rolled oats, stoneground flour, butter, brown sugar, raisins, Ceylon cinnamon, free-range egg.",
    badge: ""
  },
  {
    id: 9,
    name: "Double Chocolate Cookie",
    category: "cookies",
    price: 3.40,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/2911a29e4_generated_470b0c2e.png",
    text: "Cocoa-rich dough loaded with white and dark chocolate chunks.",
    ingredients: "Cocoa powder, stoneground flour, butter, brown sugar, white chocolate chunks, dark chocolate chunks, free-range egg, sea salt.",
    badge: ""
  },

  /* PIES */
  {
    id: 10,
    name: "Classic Apple Pie",
    category: "pies",
    price: 22.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/f4bfc043f_generated_7e8aa4ad.png",
    text: "Buttery lattice crust filled with cinnamon-spiced baking apples.",
    ingredients: "Stoneground flour, butter, Bramley apples, cane sugar, Ceylon cinnamon, lemon juice, egg wash.",
    badge: "Family size"
  },
  {
    id: 11,
    name: "Pecan Pie",
    category: "pies",
    price: 23.50,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/c62d8da49_generated_d39298c5.png",
    text: "A sticky caramel filling packed with toasted pecan halves.",
    ingredients: "Stoneground flour, butter, pecans, brown sugar, golden syrup, free-range eggs, vanilla, sea salt.",
    badge: ""
  },

  /* MERCHANDISE (branded mugs, bags, glasses and so on) */
  {
    id: 12,
    name: "Bakerz Bite Mug",
    category: "merchandise",
    price: 16.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/16a6723ee_generated_f2d34ad6.png",
    text: "Chunky stoneware mug with a deep green inside — perfect for hot cocoa.",
    ingredients: "Stoneware ceramic, 350ml capacity, dishwasher and microwave safe, deep green interior glaze.",
    badge: ""
  },
  {
    id: 13,
    name: "Bakerz Bite Bag",
    category: "merchandise",
    price: 18.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/3884ff3fa_generated_image.png",
    text: "Organic cotton canvas tote bag, screen-printed with the Bakerz Bite logo.",
    ingredients: "Organic cotton canvas, 38 × 42cm, 10L capacity, screen-printed logo, machine washable.",
    badge: "New"
  },
  {
    id: 14,
    name: "Bakerz Bite Glass",
    category: "merchandise",
    price: 14.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/6eab5989e_generated_image.png",
    text: "Hand-blown drinking glass with a deep green interior and etched Bakerz Bite mark.",
    ingredients: "Hand-blown glass, 300ml, etched logo, dishwasher safe, deep green interior glaze.",
    badge: ""
  },
  {
    id: 15,
    name: "Bakerz Bite Tray",
    category: "merchandise",
    price: 28.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/c3c727d29_generated_image.png",
    text: "Solid oak serving tray, branded on the base, perfect for breakfast in bed.",
    ingredients: "Solid oak wood, 35 × 25cm, food-safe oil finish, branded base, wipe clean only.",
    badge: ""
  },
  {
    id: 16,
    name: "Reusable Bottle",
    category: "merchandise",
    price: 19.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/44b8a90ee_generated_74644f79.png",
    text: "Matte forest-green bottle that keeps drinks cold all day long.",
    ingredients: "Double-walled stainless steel, 500ml, keeps drinks cold 24 hours, matte forest green finish.",
    badge: ""
  },
  {
    id: 17,
    name: "Recipe Notebook",
    category: "merchandise",
    price: 12.00,
    image: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/82d84f239_generated_f04b3424.png",
    text: "A hardback notebook for your own bakes, with a ribbon marker.",
    ingredients: "Hardback cover, 160 lined pages, ribbon marker, 148 × 210mm.",
    badge: ""
  }

];


/* The filter buttons above the products.
   "name" must match the category written on the products;
   "label" is the text people see on the button. */
const categories = [
  { name: "all",         label: "Everything" },
  { name: "cakes",       label: "Cakes" },
  { name: "pastries",    label: "Pastries" },
  { name: "cookies",     label: "Cookies" },
  { name: "pies",        label: "Pies" },
  { name: "merchandise", label: "Merchandise" }
];
