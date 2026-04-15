import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Zap, 
  BookOpen, 
  Users,
  Leaf,
  Info,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const IMAGES = {
  counter: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
  coffee: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1000&q=80",
  exterior: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80",
  signage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80",
};

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  longDescription: string;
  tag?: string;
  image: string;
  ingredients: string[];
  calories: string;
  allergens?: string[];
}

const MENU_HIGHLIGHTS: MenuItem[] = [
  {
    id: "cold-brew",
    name: "Cold Brew",
    price: "$5.50",
    description: "Our fan favorite. Smooth, bold, and brewed for 18 hours. Some say it's the best in Perth.",
    longDescription: "Experience the ultimate caffeine kick with our signature Cold Brew. We steep our premium, ethically sourced Arabica beans in cold filtered water for a full 18 hours. This slow extraction process results in a remarkably smooth, naturally sweet coffee with zero bitterness and a powerful caffeine punch. Perfect for hot Perth days or when you need serious focus.",
    tag: "Fan Favorite",
    image: IMAGES.coffee,
    ingredients: ["100% Arabica Coffee Beans (Single Origin)", "Triple Filtered Water", "Ice"],
    calories: "15 kcal",
    allergens: ["None"]
  },
  {
    id: "thai-green-chicken",
    name: "Thai Green Chicken",
    price: "$12.50",
    description: "Aromatic, creamy, and just the right amount of spice. The perfect brain fuel for long study sessions.",
    longDescription: "A comforting, hearty bowl of authentic Thai Green Curry. Made from scratch using fresh green chilies, lemongrass, and galangal, simmered in rich coconut milk with tender chicken breast slices and crisp vegetables. Served over steaming fragrant jasmine rice. It's the ultimate comfort food to power you through your next study session.",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=800&q=80",
    ingredients: ["Free-range Chicken Breast", "Green Curry Paste (Lemongrass, Galangal, Green Chilies)", "Coconut Milk", "Bamboo Shoots", "Green Beans", "Jasmine Rice", "Fresh Thai Basil"],
    calories: "550 kcal",
    allergens: ["Soy", "Fish Sauce"]
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    price: "$6.00",
    description: "Ceremonial grade matcha whisked to perfection. Earthy, vibrant, and zen-inducing.",
    longDescription: "Find your focus with our vibrant Matcha Latte. We use only ceremonial grade matcha sourced directly from Uji, Japan, known for its brilliant green color and smooth, umami-rich flavor profile. Carefully whisked to remove any lumps and poured over perfectly textured steamed milk. A great alternative to coffee that provides a calm, sustained energy release.",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=800&q=80",
    ingredients: ["Ceremonial Grade Matcha Powder", "Steamed Milk (Dairy or Plant-based)", "Optional: Dash of Honey or Vanilla"],
    calories: "120 kcal",
    allergens: ["Dairy (if cow's milk is chosen)"]
  },
  {
    id: "caramel-slice",
    name: "Caramel Slice",
    price: "$4.50",
    description: "Rich, buttery, and dangerously addictive. The ultimate reward for finishing that assignment.",
    longDescription: "Treat yourself to our decadent, house-made Caramel Slice. It starts with a buttery, crumbly shortbread base, topped with a thick, gooey layer of golden caramel, and finished with a smooth, rich dark chocolate ganache. It's the perfect sweet treat to pair with a strong coffee.",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
    ingredients: ["Sweetened Condensed Milk", "Butter", "Brown Sugar", "Dark Chocolate (70% Cocoa)", "Wheat Flour", "Desiccated Coconut"],
    calories: "450 kcal",
    allergens: ["Dairy", "Gluten"]
  },
  {
    id: "chicken-mayo-toastie",
    name: "Chicken Mayo Toastie",
    price: "$8.50",
    description: "Crispy, melty, and classic. Made fresh, worth the wait.",
    longDescription: "Sometimes you just need a classic done right. Our Chicken Mayo Toastie features thick slices of artisan sourdough, generously filled with tender roasted chicken breast mixed with creamy whole-egg mayonnaise, sharp vintage cheddar, and a hint of spring onion. Toasted until golden brown and perfectly melted inside.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    ingredients: ["Artisan Sourdough Bread", "Roasted Chicken Breast", "Whole-egg Mayonnaise", "Vintage Cheddar Cheese", "Spring Onion", "Butter"],
    calories: "520 kcal",
    allergens: ["Gluten", "Dairy", "Egg"]
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    price: "$5.50",
    description: "A warm hug in a cup. Spiced just right for those chilly morning lectures.",
    longDescription: "Warm up with our aromatic, deeply spiced Chai Latte. We brew a robust black tea base with a traditional blend of warming spices including cinnamon, cardamom, ginger, cloves, and star anise. Sweetened lightly with honey and blended with velvety steamed milk for a comforting, fragrant experience.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    ingredients: ["Assam Black Tea", "Cinnamon", "Cardamom", "Fresh Ginger", "Cloves", "Star Anise", "Honey", "Steamed Milk"],
    calories: "180 kcal",
    allergens: ["Dairy (if cow's milk is chosen)"]
  }
];

const REVIEWS = [
  {
    text: "Best cold brew I've had in Perth. Seriously, it's a game changer for my 8am lectures.",
    author: "Sarah, UWA Student",
    rating: 5
  },
  {
    text: "Affordable coffee that doesn't taste cheap. The staff are always friendly even when it's packed.",
    author: "James, Researcher",
    rating: 5
  },
  {
    text: "Perfect campus café for study sessions. Good vibes, great snacks, and reliable caffeine.",
    author: "Emily, Postgrad",
    rating: 4
  },
  {
    text: "The caramel slice is to die for. Quick service most days, perfect for a grab-and-go.",
    author: "Liam, Staff",
    rating: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-bottom py-3 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-transform group-hover:rotate-12">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">Catalyst Cafe</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Menu", "Reviews", "Visit"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
            <Button onClick={() => scrollToSection("visit")}>Visit Us</Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {["About", "Menu", "Reviews", "Visit"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-serif font-bold"
                >
                  {item}
                </button>
              ))}
              <Button size="lg" className="mt-4" onClick={() => scrollToSection("visit")}>
                Visit Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm font-medium">
              📍 Barry J Marshall Library
            </Badge>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-6 tracking-tighter">
              Fuel Your Brain. <br />
              <span className="text-primary italic">Not Just</span> Your Coffee.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Great coffee, student prices, and a place to actually get things done. 
              The hidden gem of UWA where productivity meets caffeine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-lg" onClick={() => scrollToSection("menu")}>
                View Menu
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" onClick={() => scrollToSection("visit")}>
                Visit Us
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span>Join 500+ students daily</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src={IMAGES.counter} 
                alt="Catalyst Cafe Counter" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground">
                  <Leaf size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Eco-Friendly</span>
              </div>
              <p className="text-sm font-medium leading-tight">
                Bring your own cup & save <span className="text-primary font-bold">50¢</span> on every brew.
              </p>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-6 rounded-full shadow-xl flex flex-col items-center justify-center w-32 h-32 rotate-12"
            >
              <span className="text-xs uppercase font-bold tracking-widest">Only</span>
              <span className="text-3xl font-serif font-bold">$8</span>
              <span className="text-[10px] text-center leading-none">Croissant + <br />Medium Coffee</span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src={IMAGES.exterior} alt="Cafe Exterior" className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover" referrerPolicy="no-referrer" />
                  <div className="bg-primary p-8 rounded-2xl text-primary-foreground">
                    <h3 className="text-4xl font-serif font-bold mb-2">01</h3>
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Hidden Gem</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-secondary p-8 rounded-2xl text-secondary-foreground">
                    <h3 className="text-4xl font-serif font-bold mb-2">02</h3>
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Study Hub</p>
                  </div>
                  <img src={IMAGES.signage} alt="Cafe Signage" className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">
                The Campus Spot You've <br />
                <span className="italic text-primary">Actually</span> Been Looking For.
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Tucked away in the Barry J Marshall Library, Catalyst Cafe isn't just another coffee shop. 
                  We're the unofficial headquarters for UWA's brightest minds (and the most caffeinated ones).
                </p>
                <p>
                  We know the struggle: assignments due, exams looming, and a bank account that says "instant noodles" 
                  while your soul screams "specialty latte." That's why we keep our prices student-friendly 
                  without compromising on the quality of our beans.
                </p>
                <p className="font-medium text-foreground italic">
                  "Made fresh, worth the wait." — It's not just a slogan, it's our promise when we're crafting 
                  your perfect Thai Green Chicken or that life-saving Cold Brew.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Community</h4>
                    <p className="text-sm text-muted-foreground">The heart of UWA campus life.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Study Space</h4>
                    <p className="text-sm text-muted-foreground">Quiet corners and fast Wi-Fi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-5xl font-serif font-bold mb-6">Brain Fuel Menu</h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked bestsellers to keep you going from your first 8am lecture 
              to that late-night library grind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(item)}
                >
                  {item.image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        {item.tag && (
                          <Badge className="mb-2 bg-secondary text-secondary-foreground hover:bg-secondary">
                            {item.tag}
                          </Badge>
                        )}
                        <h3 className="text-2xl font-serif font-bold">{item.name}</h3>
                      </div>
                      <span className="text-xl font-bold text-primary">{item.price}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              * Full menu available in-store including vegetarian and vegan options.
            </p>
            <Button variant="outline" size="lg" className="rounded-full group">
              See Full Menu <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Why People Love Us */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">
                Why Catalyst is the <br />
                <span className="italic opacity-80">Smart Choice.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Perth's Best Cold Brew", desc: "Smooth, bold, and consistently rated as the top caffeine fix in the area." },
                  { title: "Student-First Pricing", desc: "Premium quality that doesn't eat your entire weekly budget." },
                  { title: "Productivity Hub", desc: "The perfect balance of ambient noise and focused energy for studying." },
                  { title: "Fresh & Reliable", desc: "Every toastie and latte is crafted with care by our friendly team." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Star size={20} className="text-secondary" fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-primary-foreground/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg p-12 rounded-[3rem] border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-secondary-foreground">
                    <Coffee size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold">The Catalyst Vibe</h3>
                    <p className="text-primary-foreground/60">More than just a cafe.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                    <span className="font-medium">Caffeine Levels</span>
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        className="h-full bg-secondary" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                    <span className="font-medium">Study Productivity</span>
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "88%" }}
                        className="h-full bg-secondary" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                    <span className="font-medium">Student Budget Friendly</span>
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        className="h-full bg-secondary" 
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-12 p-6 rounded-2xl bg-secondary text-secondary-foreground text-center font-bold italic">
                  "Assignments due? We've got your back (and your caffeine levels)."
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-serif font-bold mb-6">What the Campus is Saying</h2>
              <p className="text-muted-foreground text-lg">
                Don't just take our word for it. Here's why students and staff 
                keep coming back to Catalyst.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="px-4 py-2 text-sm">4.5/5 Google Rating</Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">1000+ Happy Students</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none bg-muted/50 hover:bg-muted transition-colors">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex gap-1 mb-6 text-primary">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-lg italic mb-8 flex-grow leading-relaxed">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {review.author[0]}
                      </div>
                      <span className="font-bold text-sm">{review.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section id="visit" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-12 md:p-16">
              <h2 className="text-5xl font-serif font-bold mb-8">Drop By Today</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Location</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Barry J Marshall Library, Parkway, <br />
                      Crawley WA 6009, Australia
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Opening Hours</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-muted-foreground">
                      <span>Mon - Fri</span>
                      <span className="font-medium text-foreground">8:00 AM - 4:00 PM</span>
                      <span>Sat - Sun</span>
                      <span className="font-medium text-foreground">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Contact</h4>
                    <p className="text-muted-foreground">+61 8 6488 4697</p>
                  </div>
                </div>

                <div className="pt-8 flex gap-4">
                  <Button size="lg" className="rounded-full px-8">Get Directions</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                      <Instagram size={20} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                      <Facebook size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative min-h-[400px] bg-muted">
              {/* Embedded Map Placeholder - In a real app, use Google Maps Embed API */}
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1000/1000')] bg-cover bg-center grayscale opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-border">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Catalyst Cafe</p>
                    <p className="text-xs text-muted-foreground">Barry J Marshall Library</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">Catalyst Cafe</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Catalyst Cafe. All rights reserved. 
            <span className="mx-2">|</span>
            Built for the UWA Community.
          </p>
          
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Product Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background/80 backdrop-blur-md p-4 border-b z-10 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setSelectedProduct(null)} className="gap-2">
                <ChevronLeft size={16} /> Back to Menu
              </Button>
              <span className="font-serif font-bold text-lg">{selectedProduct.name}</span>
              <div className="w-24" /> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-12 max-w-5xl flex-grow">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-[2rem] overflow-hidden shadow-2xl aspect-square sticky top-24"
                >
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    {selectedProduct.tag && (
                      <Badge className="mb-4 bg-secondary text-secondary-foreground hover:bg-secondary">
                        {selectedProduct.tag}
                      </Badge>
                    )}
                    <h1 className="text-5xl font-serif font-bold mb-4">{selectedProduct.name}</h1>
                    <p className="text-3xl font-bold text-primary">{selectedProduct.price}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Info size={20} className="text-primary" /> About this item
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {selectedProduct.longDescription}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Leaf size={20} className="text-primary" /> Ingredients
                      </h3>
                      <ul className="space-y-2">
                        {selectedProduct.ingredients.map((ingredient, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <Flame size={20} className="text-primary" /> Nutritional Info
                        </h3>
                        <div className="bg-muted p-4 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Calories</span>
                            <span className="font-bold text-lg">{selectedProduct.calories}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            * Based on standard serving size. 2000 calories a day is used for general nutrition advice.
                          </p>
                        </div>
                      </div>

                      {selectedProduct.allergens && (
                        <div>
                          <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Allergens</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.allergens.map((allergen, i) => (
                              <Badge key={i} variant="outline" className="bg-background">
                                {allergen}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
