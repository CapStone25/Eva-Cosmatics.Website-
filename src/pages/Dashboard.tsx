import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Package, ShoppingCart, Plus, Pencil, Trash2, Users } from "lucide-react";
import { resolveProductImage, productImageOptions } from "@/lib/productImages";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string | null;
  skin_type: string | null;
  in_stock: boolean | null;
}

interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  shipping_address: string | null;
  phone_number: string | null;
  created_at: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productCount, setProductCount] = useState(0);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    skin_type: "",
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setUsers(data as UserProfile[]);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);

    // Get exact count from DB
    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });
    setProductCount(count ?? 0);
  };

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setOrders(data);
      for (const order of data) {
        fetchOrderItems(order.id);
      }
    }
  };

  const fetchOrderItems = async (orderId: string) => {
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);
    if (data) {
      setOrderItems(prev => ({ ...prev, [orderId]: data }));
    }
  };

  const handleCreateProduct = async () => {
    const { error } = await supabase.from("products").insert({
      name: productForm.name,
      description: productForm.description,
      price: parseFloat(productForm.price),
      image: productForm.image,
      category: productForm.category,
      skin_type: productForm.skin_type,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to create product", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Product created successfully" });
      setIsProductDialogOpen(false);
      resetForm();
      fetchProducts();
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    const { error } = await supabase
      .from("products")
      .update({
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        image: productForm.image,
        category: productForm.category,
        skin_type: productForm.skin_type,
      })
      .eq("id", editingProduct.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update product", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Product updated successfully" });
      setIsProductDialogOpen(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Product deleted successfully" });
      fetchProducts();
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);
    if (error) {
      toast({ title: "Error", description: "Failed to update order status", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Order status updated" });
      fetchOrders();
    }
  };

  const resetForm = () => {
    setProductForm({ name: "", description: "", price: "", image: "", category: "", skin_type: "" });
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      image: product.image || "",
      category: product.category || "",
      skin_type: product.skin_type || "",
    });
    setIsProductDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">Admin Dashboard</h1>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-card">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-9 w-9 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-3xl font-bold text-foreground">{productCount}</p>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">Products</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-card">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-9 w-9 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-3xl font-bold text-foreground">{orders.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">Orders</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-card">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-9 w-9 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-3xl font-bold text-foreground">{users.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">Users</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
              <TabsTrigger value="products" className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4">
                <Package className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Products</span>
                <span className="sm:hidden">Items</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4">
                <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4">
                <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Users</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-card">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <h2 className="text-lg md:text-2xl font-semibold text-foreground">Products Management</h2>
                  <Dialog open={isProductDialogOpen} onOpenChange={(open) => {
                    setIsProductDialogOpen(open);
                    if (!open) { setEditingProduct(null); resetForm(); }
                  }}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 w-full sm:w-auto"><Plus className="h-4 w-4" />Add Product</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name</Label>
                          <Input id="name" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input id="description" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Product Image</Label>
                          <Select value={productForm.image} onValueChange={(value) => setProductForm({ ...productForm, image: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an image" />
                            </SelectTrigger>
                            <SelectContent>
                              {productImageOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  <div className="flex items-center gap-2">
                                    <img src={resolveProductImage(opt.value)} alt={opt.label} className="w-8 h-8 object-contain rounded" />
                                    <span>{opt.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {productForm.image && (
                            <div className="mt-2 flex justify-center">
                              <img src={resolveProductImage(productForm.image)} alt="Preview" className="w-24 h-24 object-contain rounded-lg border border-border" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input id="category" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="skinType">Skin Type</Label>
                          <Input id="skinType" value={productForm.skin_type} onChange={(e) => setProductForm({ ...productForm, skin_type: e.target.value })} />
                        </div>
                        <Button onClick={editingProduct ? handleUpdateProduct : handleCreateProduct} className="w-full">
                          {editingProduct ? "Update Product" : "Create Product"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No products yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted rounded-xl">
                        <img
                          src={resolveProductImage(product.image)}
                          alt={product.name}
                          className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg bg-white p-1 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm md:text-base truncate">{product.name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            ${product.price.toFixed(2)} {product.category ? `\u00B7 ${product.category}` : ""}
                          </p>
                        </div>
                        <div className="flex gap-1.5 md:gap-2 flex-shrink-0">
                          <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9" onClick={() => openEditDialog(product)}>
                            <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9 text-destructive hover:text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-card">
                <h2 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-6">Orders Management</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-3 md:p-4 bg-muted rounded-xl space-y-3 md:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground text-sm md:text-base">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()} {'\u00B7'} ${order.total.toFixed(2)}
                            </p>
                            {order.phone_number && (
                              <p className="text-xs text-muted-foreground mt-1">{order.phone_number}</p>
                            )}
                            {order.shipping_address && (
                              <p className="text-xs text-muted-foreground mt-1 truncate max-w-[200px] md:max-w-none">{order.shipping_address}</p>
                            )}
                          </div>
                          <Select value={order.status} onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}>
                            <SelectTrigger className="w-full sm:w-32"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {orderItems[order.id] && orderItems[order.id].length > 0 && (
                          <div className="border-t border-border pt-3 mt-3">
                            <p className="text-xs md:text-sm font-medium mb-2">Order Items:</p>
                            <div className="space-y-2">
                              {orderItems[order.id].map((item) => (
                                <div key={item.id} className="flex justify-between text-xs md:text-sm bg-background/50 p-2 rounded-lg">
                                  <span className="truncate mr-2">{item.product_name} x{item.quantity}</span>
                                  <span className="font-medium flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-card">
                <h2 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-6">All Users ({users.length})</h2>
                {users.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No users yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((u) => (
                      <div key={u.id} className="flex items-center gap-3 p-3 md:p-4 bg-muted rounded-xl">
                        <Avatar className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0">
                          <AvatarImage src={u.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                            {(u.full_name || u.email || "U").charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm md:text-base truncate">{u.full_name || "No name"}</p>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">{u.email || "No email"}</p>
                        </div>
                        <div className="text-right flex-shrink-0 hidden sm:block">
                          <p className="text-xs text-muted-foreground">{u.phone || "\u2014"}</p>
                          <p className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
