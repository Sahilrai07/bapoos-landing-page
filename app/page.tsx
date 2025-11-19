'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Phone, Mail, MapPin, Users, Award, Clock, TrendingUp, Star, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [franchiseModalOpen, setFranchiseModalOpen] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [countersStarted, setCountersStarted] = useState(false)
  const [counts, setCounts] = useState({ outlets: 0, customers: 0, years: 0, satisfaction: 0 })
  const statsRef = useRef<HTMLDivElement>(null)

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true)
          animateCounters()
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [countersStarted])

  const animateCounters = () => {
    const targets = { outlets: 15, customers: 1000000, years: 10, satisfaction: 98 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        outlets: Math.floor(targets.outlets * progress),
        customers: Math.floor(targets.customers * progress),
        years: Math.floor(targets.years * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts(targets)
      }
    }, interval)
  }

  // Gallery images
  const galleryImages = [
    '/modern-fast-food-interior.png',
    '/delicious-burger-fries.png',
    '/happy-customers-dining.jpg',
    '/kitchen-food-preparation.jpg',
  ]

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Form handlers
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log('Contact Form Data:', Object.fromEntries(formData))
    alert('Thank you for your inquiry! We will get back to you soon.')
    e.currentTarget.reset()
  }

  const handleFranchiseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log('Franchise Form Data:', Object.fromEntries(formData))
    alert('Thank you for your franchise application! Our team will contact you within 48 hours.')
    e.currentTarget.reset()
    setFranchiseModalOpen(false)
  }

  const menuItems = [
    {
      name: "Bapoo's Special Burger",
      description: "Juicy patty with secret sauce, fresh veggies",
      price: "₹149",
      image: '/special-burger-with-toppings.jpg',
    },
    {
      name: "Crispy Chicken Wrap",
      description: "Tender chicken, crispy coating, tangy mayo",
      price: "₹129",
      image: '/chicken-wrap-with-sauce.jpg',
    },
    {
      name: "Paneer Tikka Pizza",
      description: "Fusion delight with Indian spices",
      price: "₹199",
      image: '/paneer-tikka-pizza.jpg',
    },
    {
      name: "Loaded Fries",
      description: "Crispy fries with cheese and toppings",
      price: "₹99",
      image: '/loaded-cheese-fries.jpg',
    },
    {
      name: "Masala Sandwich",
      description: "Grilled sandwich with spicy filling",
      price: "₹79",
      image: '/grilled-masala-sandwich.jpg',
    },
    {
      name: "Chocolate Shake",
      description: "Thick, creamy, and indulgent",
      price: "₹89",
      image: '/chocolate-milkshake.png',
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Patel",
      role: "Franchise Owner, Surat",
      quote: "Best decision I made! The support from BAPOO's team is exceptional. My outlet is thriving!",
      avatar: '/indian-businessman-portrait.png',
    },
    {
      name: "Priya Sharma",
      role: "Regular Customer",
      quote: "The taste is consistently amazing! BAPOO's has become our family's favorite fast food spot.",
      avatar: '/indian-woman-smiling.png',
    },
    {
      name: "Amit Desai",
      role: "Franchise Owner, Vadodara",
      quote: "From setup to operations, everything was smooth. Great ROI and brand recognition!",
      avatar: '/indian-entrepreneur-portrait.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/bapoos-logo.jpg"
                alt="BAPOO's FAST FOOD Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-primary">BAPOO&apos;S FAST FOOD</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('menu')} className="hover:text-primary transition-colors">
                Menu
              </button>
              <button onClick={() => scrollToSection('franchise')} className="hover:text-primary transition-colors">
                Franchise
              </button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-primary transition-colors">
                Gallery
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-8">
                  <button onClick={() => scrollToSection('home')} className="text-lg hover:text-primary transition-colors text-left">
                    Home
                  </button>
                  <button onClick={() => scrollToSection('menu')} className="text-lg hover:text-primary transition-colors text-left">
                    Menu
                  </button>
                  <button onClick={() => scrollToSection('franchise')} className="text-lg hover:text-primary transition-colors text-left">
                    Franchise
                  </button>
                  <button onClick={() => scrollToSection('gallery')} className="text-lg hover:text-primary transition-colors text-left">
                    Gallery
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-lg hover:text-primary transition-colors text-left">
                    Contact
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                Crafting Flavours You’ll Crave Again.
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Fast. Fresh. Flavour-packed — Join our franchise family.
              </p>
              <div className="flex flex-wrap gap-4">
                <Dialog open={franchiseModalOpen} onOpenChange={setFranchiseModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg px-8">
                      Become a Franchise Partner
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Franchise Application</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and our team will contact you within 48 hours.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFranchiseSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="franchise-name">Full Name *</Label>
                        <Input id="franchise-name" name="name" required />
                      </div>
                      <div>
                        <Label htmlFor="franchise-phone">Phone *</Label>
                        <Input id="franchise-phone" name="phone" type="tel" required />
                      </div>
                      <div>
                        <Label htmlFor="franchise-email">Email *</Label>
                        <Input id="franchise-email" name="email" type="email" required />
                      </div>
                      <div>
                        <Label htmlFor="franchise-city">City *</Label>
                        <Input id="franchise-city" name="city" required />
                      </div>
                      <div>
                        <Label htmlFor="franchise-investment">Investment Range *</Label>
                        <Select name="investment" required>
                          <SelectTrigger id="franchise-investment">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10-20">₹10-20 Lakhs</SelectItem>
                            <SelectItem value="20-30">₹20-30 Lakhs</SelectItem>
                            <SelectItem value="30-50">₹30-50 Lakhs</SelectItem>
                            <SelectItem value="50+">₹50+ Lakhs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="franchise-message">Message</Label>
                        <Textarea id="franchise-message" name="message" rows={3} />
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1">Submit Application</Button>
                        <Button type="button" variant="outline" asChild>
                          <a href="#" download>Download Brochure</a>
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('menu')}>
                  Explore Menu
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative animate-float">
                <Image
                  src="/delicious-burger-with-glow-effect.jpg"
                  alt="Featured Food"
                  width={500}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl -z-10 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose BAPOO&apos;S?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Since 2015, we&apos;ve been serving Gujarat with authentic flavors and modern convenience. 
              Our commitment to quality and taste has made us a household name.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>15+ Outlets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Across Gujarat</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Quality Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Fresh & Premium</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fast Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Quick & Efficient</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Brand Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Complete Assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Signature Menu</h2>
            <p className="text-lg text-muted-foreground">Crafted with love, served with pride</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why BAPOO's Highlight */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="space-y-2">
              <Award className="h-8 w-8 mx-auto" />
              <p className="font-semibold">Award Winning</p>
            </div>
            <div className="space-y-2">
              <Users className="h-8 w-8 mx-auto" />
              <p className="font-semibold">Expert Team</p>
            </div>
            <div className="space-y-2">
              <Clock className="h-8 w-8 mx-auto" />
              <p className="font-semibold">Quick Service</p>
            </div>
            <div className="space-y-2">
              <Star className="h-8 w-8 mx-auto" />
              <p className="font-semibold">Top Rated</p>
            </div>
            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 mx-auto" />
              <p className="font-semibold">Growing Fast</p>
            </div>
            <div className="space-y-2">
              <MapPin className="h-8 w-8 mx-auto" />
              <p className="font-semibold">Multiple Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Opportunity */}
      <section id="franchise" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Franchise Opportunity</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the BAPOO&apos;S family and be part of Gujarat&apos;s fastest-growing fast food chain
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Investment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-primary">Customised Investment Options</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Setup & Equipment</li>
                  <li>• Initial Inventory</li>
                  <li>• Training & Support</li>
                  <li>• Marketing Materials</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-primary">360° Assistance</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Site Selection Help</li>
                  <li>• Staff Training</li>
                  <li>• Marketing Support</li>
                  <li>• Operations Guidance</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">ROI & Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-primary">18-24 Months</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Break-even Period</li>
                  <li>• Proven Business Model</li>
                  <li>• Strong Brand Recognition</li>
                  <li>• Ongoing Revenue</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center space-x-4">
            <Dialog open={franchiseModalOpen} onOpenChange={setFranchiseModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-lg px-8">
                  Apply for Franchise
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="#" download>Download Brochure</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Growth Stats */}
      <section ref={statsRef} className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center tracking-normal">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{counts.outlets}+</div>
              <p className="text-lg text-muted-foreground">Outlets</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{counts.customers.toLocaleString()}+</div>
              <p className="text-lg text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{counts.years}+</div>
              <p className="text-lg text-muted-foreground">Years of Excellence</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{counts.satisfaction}%</div>
              <p className="text-lg text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Gallery & Ambience</h2>
            <p className="text-lg text-muted-foreground">Experience the BAPOO&apos;S vibe</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src={galleryImages[currentGalleryIndex] || "/placeholder.svg"}
                alt={`Gallery image ${currentGalleryIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevGalleryImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextGalleryImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="flex justify-center gap-2 mt-4">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentGalleryIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentGalleryIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What People Say</h2>
            <p className="text-lg text-muted-foreground">Hear from our franchise partners and customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">Have questions? We&apos;d love to hear from you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input id="contact-name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="contact-mobile">Mobile *</Label>
                      <Input id="contact-mobile" name="mobile" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input id="contact-email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="contact-city">City *</Label>
                      <Input id="contact-city" name="city" required />
                    </div>
                    <div>
                      <Label htmlFor="contact-inquiry">Inquiry Type *</Label>
                      <Select name="inquiryType" required>
                        <SelectTrigger id="contact-inquiry">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="franchise">Franchise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea id="contact-message" name="message" rows={4} />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+919876543210" className="text-lg hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:info@bapoosfastfood.com" className="text-lg hover:text-primary transition-colors">
                    info@bapoosfastfood.com
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    123 CG Road, Navrangpura<br />
                    Ahmedabad, Gujarat 380009
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/bapoos-logo.jpg"
                  alt="BAPOO's Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-bold">BAPOO&apos;S</span>
              </div>
              <p className="text-muted-foreground">
                Gujarat&apos;s favorite fast food destination since 2015.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('menu')} className="text-muted-foreground hover:text-primary transition-colors">Menu</button></li>
                <li><button onClick={() => scrollToSection('franchise')} className="text-muted-foreground hover:text-primary transition-colors">Franchise</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">Stay updated with our latest offers</p>
              <div className="flex gap-2">
                <Input placeholder="Your email" type="email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 BAPOO&apos;S FAST FOOD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
