import { useEffect, useState, useRef } from 'react'
import { 
  Menu, X, ChevronRight, ChevronLeft, ShoppingBag, 
  Leaf, Sun, Wind, Snowflake, Droplets, Heart, 
  ArrowRight, Mail, Phone, MapPin, Check, 
  Sparkles, Shield, Zap, BarChart3, Users,
  Play, Plus, Minus, ExternalLink
} from 'lucide-react'

// 滚动显现 Hook
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </div>
  )
}

// 粒子背景组件
function ParticleBackground() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    const particles = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      })
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 165, 116, ${p.opacity})`
        ctx.fill()
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// 导航栏
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    {name: '首页', href: '#hero'},
    {name: '礼盒', href: '#gifts'},
    {name: '系统', href: '#systems'},
    {name: '药谷', href: '#pengzu'},
    {name: '案例', href: '#cases'},
    {name: '联系', href: '#contact'},
  ]
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E53935] to-[#D4A574] flex items-center justify-center text-white font-bold text-lg">
            赤
          </div>
          <div className="text-2xl font-bold tracking-tight text-white">
            赤橙<span className="text-[#D4A574]">礼</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-white/60 hover:text-[#D4A574] transition-colors text-sm font-medium">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded-full text-sm font-medium transition-all flex items-center gap-2">
            立即咨询 <ArrowRight size={16} />
          </a>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-[#D4A574] transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero 主视觉
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <ParticleBackground />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E53935]/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#D4A574]/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <Reveal>
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#D4A574]/30 bg-[#D4A574]/10 text-[#D4A574] text-sm font-medium tracking-widest">
            中国式情感储蓄与节气养生的时代融合
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-6 leading-tight text-white">
            用一年的<span className="text-gradient">时间</span>
            <br />
            存满一罐<span className="text-gradient">温情</span>
          </h1>
        </Reveal>
        
        <Reveal delay={200}>
          <p className="text-xl md:text-2xl text-white/50 mb-8 font-light">
            十二季时光礼盒 · 顺时养生 · 赤诚与人
          </p>
        </Reveal>
        
        <Reveal delay={300}>
          <p className="text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed">
            以二十四节气为纲，将东方草木智慧融入当代情感消费，
            <br className="hidden md:block" />
            为企业和个人提供全场景节气关怀解决方案。
          </p>
        </Reveal>
        
        <Reveal delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#gifts" className="px-8 py-4 bg-[#E53935] hover:bg-[#c62828] text-white rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center gap-2">
              探索礼盒 <ArrowRight size={18} />
            </a>
            <a href="#systems" className="px-8 py-4 border border-white/20 hover:border-[#D4A574]/50 text-white rounded-full font-medium transition-all hover:bg-white/5">
              了解系统
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// SubHero
function SubHero() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-y border-white/5 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            让每一次关怀，都<span className="text-[#D4A574]">恰逢其时</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-lg text-white/50 leading-relaxed">
            我们相信，最好的关系不是时刻联系，而是在对方最需要的时候，送上一份恰到好处的温暖。
            <br className="hidden md:block" />
            赤橙礼以节气为节点，帮你记住每一个值得被记住的时刻。
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// 品牌理念 About
function About() {
  return (
    <section className="py-32 bg-[#0A0A0A] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="text-[#D4A574] text-sm font-bold tracking-wider">BRAND PHILOSOPHY</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                天人合一
                <br />
                <span className="text-white/40">顺时养生</span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                源自彭祖养生文化，我们将"顺时养生"的智慧融入现代情感消费。
                每个节气都是自然与人身的共振节点，每一份礼盒都是天时与人情的精准契合。
              </p>
              <p className="text-white/60 leading-relaxed">
                从立春到冬至，十二季时光礼盒陪伴你走过完整的一年，
                让关怀不再迟到，让温暖始终在场。
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[#D4A574] font-serif text-lg italic leading-relaxed">
                  "顺时而食，顺时而居，顺时而心——这是赤橙礼想带给你的世界。"
                </p>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#E53935]/20 to-[#D4A574]/20 border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E53935] to-[#D4A574] flex items-center justify-center text-white text-5xl shadow-2xl">
                    礼
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">赤橙礼</h3>
                  <p className="text-white/40">CHICHENG · 节气养生</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#E53935]/10 rounded-full blur-3xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// 礼盒轮播
function GiftCarousel() {
  const [current, setCurrent] = useState(0)
  const gifts = [
    { name: '二月礼盒・立春雨水', price: 199, theme: '春生', keyword: '疏肝理气', season: '春', color: 'from-green-500 to-emerald-600' },
    { name: '四月礼盒・清明谷雨', price: 299, theme: '春生', keyword: '健脾祛湿', season: '春', color: 'from-teal-500 to-cyan-600' },
    { name: '六月礼盒・芒种夏至', price: 399, theme: '夏长', keyword: '清心降火', season: '夏', color: 'from-orange-500 to-red-500' },
    { name: '八月礼盒・立秋处暑', price: 399, theme: '秋收', keyword: '滋阴润肺', season: '秋', color: 'from-amber-500 to-yellow-600' },
    { name: '十月礼盒・霜降立冬', price: 499, theme: '冬藏', keyword: '温补养肾', season: '冬', color: 'from-blue-500 to-indigo-600' },
  ]
  
  const next = () => setCurrent((prev) => (prev + 1) % gifts.length)
  const prev = () => setCurrent((prev) => (prev - 1 + gifts.length) % gifts.length)
  
  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <section id="gifts" className="py-32 bg-[#0A0A0A] px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">SOLAR GIFT BOX</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">节气礼盒</h2>
            <p className="text-white/40">一季一礼，顺时而生</p>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white/5 border border-white/10">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
                {gifts.map((gift, i) => (
                  <div key={i} className="w-full flex-shrink-0 p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className={`aspect-square rounded-2xl bg-gradient-to-br ${gift.color} flex items-center justify-center`}>
                        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-6xl">
                          {gift.season === '春' ? '🌱' : gift.season === '夏' ? '☀️' : gift.season === '秋' ? '🍂' : '❄️'}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-[#D4A574]/20 text-[#D4A574] text-sm">{gift.theme}</span>
                          <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm">{gift.season}季</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{gift.name}</h3>
                        <p className="text-[#D4A574] text-lg mb-6">关键词：{gift.keyword}</p>
                        <div className="flex items-baseline gap-2 mb-8">
                          <span className="text-4xl font-bold text-[#E53935]">¥{gift.price}</span>
                          <span className="text-white/40">/盒</span>
                        </div>
                        <button className="px-6 py-3 bg-[#E53935] hover:bg-[#c62828] text-white rounded-full font-medium transition-all flex items-center gap-2">
                          立即预订 <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
              <ChevronRight size={20} />
            </button>
            
            <div className="flex justify-center gap-2 mt-6">
              {gifts.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'w-8 bg-[#D4A574]' : 'bg-white/20'}`} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// 礼品组合定价
function GiftPackages() {
  const packages = [
    { name: '初识礼', price: 199, period: '单月体验', features: ['1款节气礼盒', '电子贺卡', '顺丰包邮'], popular: false },
    { name: '四季礼', price: 799, period: '季度订阅', features: ['4款节气礼盒', '定制贺卡', '专属顾问', '会员价9折'], popular: true },
    { name: '全年礼', price: 2388, period: '年度订阅', features: ['12款节气礼盒', 'VIP定制服务', '1对1养生顾问', '企业定制LOGO', '优先发货'], popular: false },
  ]
  
  return (
    <section className="py-32 bg-[#0A0A0A] px-4 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">PRICING</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">礼品组合</h2>
            <p className="text-white/40">灵活选择，满足不同场景需求</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 100}>
              <div className={`relative rounded-3xl p-8 border transition-all duration-300 ${pkg.popular ? 'bg-gradient-to-b from-[#E53935]/20 to-transparent border-[#E53935]/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E53935] text-white text-sm font-bold rounded-full">
                    最受欢迎
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">¥{pkg.price}</span>
                </div>
                <p className="text-white/40 text-sm mb-6">{pkg.period}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                      <Check size={16} className="text-[#D4A574]" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-medium transition-all ${pkg.popular ? 'bg-[#E53935] hover:bg-[#c62828] text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  选择方案
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// 三大系统
function Systems() {
  const [activeTab, setActiveTab] = useState('chunfen')
  const systems = {
    chunfen: {
      name: '春分 CRIS',
      title: '客户关系智能系统',
      desc: '基于节气节点的客户关怀自动化平台，帮助企业建立"顺时触达"的客户运营体系。',
      value: '客户留存率提升 35%',
      features: ['节气节点自动提醒', '客户画像分析', '关怀内容智能推荐', '效果数据追踪']
    },
    guyu: {
      name: '谷雨 CRM',
      title: '客户关系管理系统',
      desc: '专为节气消费场景设计的CRM，打通B端采购、BC端门店、C端个人全链路数据。',
      value: '销售转化提升 28%',
      features: ['全渠道客户管理', '节气营销日历', '订单履约跟踪', '复购预测模型']
    },
    jingzhe: {
      name: '惊蛰 CRIS',
      title: '渠道智能管理系统',
      desc: '面向BC端门店的渠道赋能平台，提供从选品到营销的一站式节气零售解决方案。',
      value: '门店坪效提升 42%',
      features: ['智能选品推荐', '门店营销素材库', '销售数据看板', '培训认证体系']
    }
  }
  
  return (
    <section id="systems" className="py-32 bg-[#0A0A0A] px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">SMART SYSTEMS</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">三大智能系统</h2>
            <p className="text-white/40">数字化赋能，让节气关怀更精准</p>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="flex justify-center gap-4 mb-12">
            {Object.entries(systems).map(([key, sys]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === key ? 'bg-[#E53935] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
              >
                {sys.name}
              </button>
            ))}
          </div>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-[#D4A574] text-sm font-bold mb-2">{systems[activeTab].name}</div>
                <h3 className="text-3xl font-bold text-white mb-4">{systems[activeTab].title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{systems[activeTab].desc}</p>
                <div className="inline-block px-4 py-2 rounded-full bg-[#E53935]/20 text-[#E53935] font-bold mb-8">
                  {systems[activeTab].value}
                </div>
                <ul className="space-y-3">
                  {systems[activeTab].features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-white/70">
                      <div className="w-6 h-6 rounded-full bg-[#D4A574]/20 flex items-center justify-center">
                        <Check size={14} className="text-[#D4A574]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#E53935]/20 to-[#D4A574]/20 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {activeTab === 'chunfen' ? '🌸' : activeTab === 'guyu' ? '🌧️' : '⚡'}
                  </div>
                  <div className="text-white/40 text-sm">系统示意图</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// 四象特性
function Features() {
  const features = [
    { icon: <Leaf size={32} />, title: '顺时养生', desc: '遵循二十四节气规律，科学配伍养生方案', color: 'text-green-400', bg: 'from-green-500/20 to-green-600/10' },
    { icon: <Sparkles size={32} />, title: '情感储蓄', desc: '用时间沉淀关系，让关怀更有温度', color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-600/10' },
    { icon: <BarChart3 size={32} />, title: '数据驱动', desc: '智能分析客户偏好，精准匹配节气礼品', color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/10' },
    { icon: <Shield size={32} />, title: '品质保障', desc: '严选道地药材，全程溯源可追踪', color: 'text-red-400', bg: 'from-red-500/20 to-red-600/10' },
  ]
  
  return (
    <section className="py-32 bg-[#0A0A0A] px-4 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${f.bg} flex items-center justify-center ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// 品质承诺
function Quality() {
  const items = [
    { title: '道地药材', desc: '严选核心产区原料', icon: <Leaf size={24} /> },
    { title: '科学配伍', desc: '中医团队研发配方', icon: <Sparkles size={24} /> },
    { title: '全程溯源', desc: '一物一码可追溯', icon: <Shield size={24} /> },
    { title: '顺丰冷链', desc: '保鲜直达无忧', icon: <Zap size={24} /> },
    { title: '无忧售后', desc: '7天无理由退换', icon: <Heart size={24} /> },
  ]
  
  return (
    <section className="py-32 bg-[#0A0A0A] px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">QUALITY</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">品质承诺</h2>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4A574]/10 flex items-center justify-center text-[#D4A574]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// 系统入口
function SystemEntry() {
  const systems = [
    { name: '春分 CRIS', desc: '客户关系智能系统', icon: '🌸', href: '#' },
    { name: '谷雨 CRM', desc: '客户关系管理', icon: '🌧️', href: '#' },
    { name: '惊蛰 CRIS', desc: '渠道智能管理', icon: '⚡', href: '#' },
  ]
  
  return (
    <section className="py-24 bg-[#0A0A0A] px-4 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">系统快速入口</h2>
            <p className="text-white/40">选择适合您的数字化解决方案</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((sys, i) => (
            <Reveal key={sys.name} delay={i * 100}>
              <a href={sys.href} className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A574]/50 transition-all group text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{sys.icon}</div>
                <h3 className="text-xl font-bold text-white mb-1">{sys.name}</h3>
                <p className="text-white/40 text-sm mb-4">{sys.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#D4A574] text-sm">
                  进入系统 <ExternalLink size={14} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}// 彭祖药谷
function PengzuValley() {
  return (
    <section id="pengzu" className="py-32 bg-[#0A0A0A] px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">INDUSTRIAL BASE</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">彭祖药谷</h2>
            <p className="text-white/40">千亿级银发经济产业生态示范区</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">一谷两平台 · 三片区四基地</h3>
              <p className="text-white/60 leading-relaxed">
                彭祖药谷以"顺时养生"产业为核心，构建覆盖中医药研发、康养旅居、农文旅融合于一体的产业集群。
                这里是赤橙礼产品的源头，也是品牌精神的发祥地。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#E53935] mb-1">1000+</div>
                  <div className="text-white/40 text-sm">亩道地药材基地</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#D4A574] mb-1">50+</div>
                  <div className="text-white/40 text-sm">入驻康养企业</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#E53935] mb-1">12</div>
                  <div className="text-white/40 text-sm">节气养生工坊</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#D4A574] mb-1">24</div>
                  <div className="text-white/40 text-sm">节气主题场景</div>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#E53935]/10 to-[#D4A574]/10 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0iI0Q0QTU3NCIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-30" />
              <div className="text-center z-10">
                <div className="text-6xl mb-4">🏔️</div>
                <h3 className="text-2xl font-bold text-white mb-2">彭祖药谷鸟瞰</h3>
                <p className="text-white/40">产业生态实景展示</p>
                <span className="inline-block mt-4 px-4 py-2 rounded-full bg-white/10 text-white/60 text-sm border border-white/10">
                  替换为实景图
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// 案例展示
function Cases() {
  const cases = [
    { title: '某金融科技集团：全年候健康护航计划', client: '某金融科技集团', category: '春分CRIS · B端', metric: '回款率提升18%', desc: '引入春分CRIS系统后，全年客户回款率提升18%，客户满意度达96%。', image: '🏢' },
    { title: '高端会员制健康管理中心', client: '云栖禅心', category: '谷雨CRM · BC端', metric: '复购率提升45%', desc: '打通BC端门店数据，实现节气营销自动化，会员复购率显著提升。', image: '🧘' },
    { title: '节气养生个人年度订阅', client: '张女士 · 上海', category: '惊蛰CRIS · C端', metric: '连续订阅24个月', desc: '从立春到冬至，十二季礼盒陪伴走过完整的一年，成为生活仪式。', image: '👩' },
  ]
  
  return (
    <section id="cases" className="py-32 bg-[#0A0A0A] px-4 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">SUCCESS STORIES</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">案例展示</h2>
            <p className="text-white/40">真实数据，见证节气关怀的力量</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="group rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4A574]/30 transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#E53935]/10 to-[#D4A574]/10 flex items-center justify-center relative">
                  <div className="text-6xl group-hover:scale-110 transition-transform">{c.image}</div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E53935]/20 text-[#E53935] text-xs font-bold">
                    {c.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{c.title}</h3>
                  <p className="text-white/40 text-sm mb-4 line-clamp-2">{c.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D4A574] font-bold">{c.metric}</span>
                    <span className="text-white/30 text-sm">{c.client}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// 视频区
function VideoSection() {
  return (
    <section className="py-32 bg-[#0A0A0A] px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">BRAND VIDEO</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">品牌宣传片</h2>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="aspect-video rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/20 to-[#D4A574]/20" />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#E53935] flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-[#E53935]/30">
                <Play size={32} fill="white" />
              </div>
              <p className="text-white/60">点击播放赤橙礼品牌宣传片</p>
              <p className="text-white/30 text-sm mt-2">2:30 · 节气养生 · 东方美学</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// 产品系列全展示
function ProductsAll() {
  const products = [
    { name: '春生・养肝茶方', season: '立春-雨水', price: 168, tag: '热销', icon: '🍵' },
    { name: '春生・清润膏方', season: '惊蛰-春分', price: 218, tag: '新品', icon: '🍐' },
    { name: '夏长・清心茶方', season: '立夏-小满', price: 168, tag: '', icon: '🌿' },
    { name: '夏长・解暑膏方', season: '芒种-夏至', price: 218, tag: '', icon: '☀️' },
    { name: '秋收・润肺茶方', season: '立秋-白露', price: 188, tag: '', icon: '🍂' },
    { name: '秋收・温润膏方', season: '寒露-霜降', price: 238, tag: '', icon: '🍯' },
    { name: '冬藏・补肾茶方', season: '立冬-大雪', price: 198, tag: '', icon: '❄️' },
    { name: '冬藏・温补膏方', season: '冬至-小寒', price: 258, tag: '限定', icon: '🔥' },
  ]
  
  return (
    <section className="py-32 bg-[#0A0A0A] px-4 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">ALL PRODUCTS</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">全系列产品</h2>
            <p className="text-white/40">四季轮转，一季一礼</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A574]/30 transition-all text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{p.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1">{p.name}</h3>
                <p className="text-white/30 text-xs mb-3">{p.season}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#E53935] font-bold">¥{p.price}</span>
                  {p.tag && <span className="px-2 py-0.5 rounded-full bg-[#E53935]/20 text-[#E53935] text-xs">{p.tag}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const faqs = [
    { q: '节气礼盒多久配送一次？', a: '每款礼盒对应一个节气，全年共12次配送。订阅"四季礼"每季度配送4盒，"全年礼"每月自动配送。' },
    { q: '企业定制可以印LOGO吗？', a: '可以。"全年礼"及以上套餐支持企业定制LOGO、定制贺卡、专属包装。批量采购请联系商务团队。' },
    { q: '三大系统如何接入使用？', a: '春分CRIS、谷雨CRM、惊蛰CRIS均为SaaS化部署，企业提供基础数据后，3个工作日内完成系统初始化与培训。' },
    { q: '产品是否支持7天无理由退换？', a: '支持。未拆封的礼盒可在签收后7天内申请退换。食品类商品拆封后不支持退换，质量问题除外。' },
    { q: '如何成为赤橙礼渠道合作伙伴？', a: '我们欢迎BC端门店、健康管理中心、瑜伽会所等渠道合作。请填写合作表单，商务团队将在24小时内联系您。' },
  ]
  
  return (
    <section className="py-32 bg-[#0A0A0A] px-4">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">FAQ</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">常见问题</h2>
          </div>
        </Reveal>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  {openIndex === i ? <Minus size={20} className="text-[#D4A574]" /> : <Plus size={20} className="text-white/40" />}
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6 text-white/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// 联系我们
function Contact() {
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }
  
  return (
    <section id="contact" className="py-32 bg-[#0A0A0A] px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Reveal>
            <div className="space-y-8">
              <div>
                <div className="text-[#D4A574] text-sm font-bold tracking-wider mb-2">CONTACT US</div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">联系我们</h2>
                <p className="text-white/40">期待与您共建节气养生生态</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E53935]/10 flex items-center justify-center text-[#E53935]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-white/40 text-sm">合作热线</div>
                    <div className="text-white font-medium text-lg">400-678-0031</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E53935]/10 flex items-center justify-center text-[#E53935]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-white/40 text-sm">商务邮箱</div>
                    <div className="text-white font-medium">bd@chichengli.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E53935]/10 flex items-center justify-center text-[#E53935]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-white/40 text-sm">总部地址</div>
                    <div className="text-white font-medium">中国・铜川・彭祖药谷</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E53935]/20 flex items-center justify-center text-[#E53935] text-2xl">✓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">提交成功</h3>
                  <p className="text-white/40">我们将在24小时内与您联系</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-white/40">姓名</label>
                      <input required type="text" placeholder="请输入姓名" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-[#D4A574] focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/40">公司</label>
                      <input required type="text" placeholder="请输入公司名" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-[#D4A574] focus:outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/40">电话</label>
                    <input required type="tel" placeholder="请输入手机号" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-[#D4A574] focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/40">需求类型</label>
                    <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4A574] focus:outline-none transition-all appearance-none">
                      <option value="">请选择</option>
                      <option value="gift">节气礼品定制</option>
                      <option value="system">系统接入咨询</option>
                      <option value="channel">渠道合作</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/40">详细需求</label>
                    <textarea rows={4} placeholder="请简述您的需求..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-[#D4A574] focus:outline-none transition-all resize-none" />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-[#E53935]/20">
                    提交咨询
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 bg-[#0A0A0A] border-t border-white/5 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E53935] to-[#D4A574] flex items-center justify-center text-white font-bold text-sm">
                赤
              </div>
              <span className="text-xl font-bold text-white">赤橙礼</span>
            </div>
            <p className="text-white/30 leading-relaxed max-w-sm mb-6">
              用一年的时间，存满一罐温情。十二季时光礼盒，顺时养生，赤诚与人。
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#E53935] hover:text-white transition-colors cursor-pointer text-xs">
                微信
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#E53935] hover:text-white transition-colors cursor-pointer text-xs">
                微博
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#E53935] hover:text-white transition-colors cursor-pointer text-xs">
                小红书
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">产品服务</h4>
            <ul className="space-y-3 text-white/30 text-sm">
              <li><a href="#gifts" className="hover:text-[#D4A574] transition-colors">节气礼盒</a></li>
              <li><a href="#systems" className="hover:text-[#D4A574] transition-colors">智能系统</a></li>
              <li><a href="#" className="hover:text-[#D4A574] transition-colors">企业定制</a></li>
              <li><a href="#" className="hover:text-[#D4A574] transition-colors">渠道加盟</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">关于我们</h4>
            <ul className="space-y-3 text-white/30 text-sm">
              <li><a href="#pengzu" className="hover:text-[#D4A574] transition-colors">彭祖药谷</a></li>
              <li><a href="#cases" className="hover:text-[#D4A574] transition-colors">成功案例</a></li>
              <li><a href="#contact" className="hover:text-[#D4A574] transition-colors">商务合作</a></li>
              <li><a href="#" className="hover:text-[#D4A574] transition-colors">加入我们</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/20 text-sm">
            赤橙礼（铜川）健康科技有限公司 版权所有
          </div>
          <div className="text-white/20 text-sm">
            陕ICP备XXXXXXXX号
          </div>
        </div>
      </div>
    </footer>
  )
}

// 主App
function App() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white antialiased selection:bg-[#E53935] selection:text-white">
      <Navbar />
      <Hero />
      <SubHero />
      <About />
      <GiftCarousel />
      <GiftPackages />
      <Systems />
      <Features />
      <Quality />
      <SystemEntry />
      <PengzuValley />
      <Cases />
      <VideoSection />
      <ProductsAll />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default App