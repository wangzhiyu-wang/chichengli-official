import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Menu, X, ShoppingBag, Leaf, Sun, Wind, Snowflake, Droplets, Heart, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

// 动画组件
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// 用于 Cooperation 的 reveal hook（必须定义在组件外部）
function useCoopReveal() {
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
    {name: '品牌故事', href: '#story'},
    {name: '节气养生', href: '#solar'},
    {name: '产品系列', href: '#products'},
    {name: '合作洽谈', href: '#coop'},
  ]
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#E85A2D] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-200">
            赤
          </div>
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-[#1A1A1A]">赤橙</span>
            <span className="text-[#FF6B35]">礼</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-gray-600 hover:text-[#FF6B35] transition-colors text-sm font-medium">
              {link.name}
            </a>
          ))}
          <a href="#coop" className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#E85A2D] text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-orange-200/50 flex items-center gap-2">
            <ShoppingBag size={16} /> 立即合作
          </a>
        </div>
        <button className="md:hidden text-[#1A1A1A]" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="block text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero区 - 品牌诗为核心
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8F0]">
      <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#FF6B35]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[#F5E6D3]/60 rounded-full blur-[80px]" />
      
      <div className="absolute top-32 left-[10%] opacity-10 animate-pulse">
        <Leaf size={40} className="text-[#FF6B35]" />
      </div>
      <div className="absolute top-48 right-[15%] opacity-10 animate-pulse delay-700">
        <Sun size={32} className="text-[#FF6B35]" />
      </div>
      <div className="absolute bottom-40 left-[20%] opacity-10 animate-pulse delay-1000">
        <Wind size={36} className="text-[#FF6B35]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium tracking-widest border border-[#FF6B35]/20">
            节气养生 × 东方生活美学
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 leading-tight"
        >
          <span className="text-[#1A1A1A]">疲惫，</span>
          <br />
          <span className="text-gradient">都软成了故乡</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-500 mb-4 font-serif italic"
        >
          —— 赤橙礼品牌诗
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed text-lg"
        >
          顺时养生，赤诚与人。以二十四节气为纲，将东方草木智慧融入当代生活，
          <br className="hidden md:block" />
          为每一个奔波的灵魂，重建与自然的温柔契约。
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#products" className="px-8 py-4 bg-[#FF6B35] hover:bg-[#E85A2D] text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-200/50 flex items-center justify-center gap-2">
            探索节气产品 <ArrowRight size={18} />
          </a>
          <a href="#story" className="px-8 py-4 border-2 border-[#1A1A1A]/10 hover:border-[#FF6B35]/30 text-[#1A1A1A] rounded-full font-medium transition-all hover:bg-white">
            了解品牌故事
          </a>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FFF8F0] to-transparent" />
    </section>
  )
}

// 品牌故事
function BrandStory() {
  return (
    <section id="story" className="py-32 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4">品牌故事</h2>
            <p className="text-xl text-[#FF6B35] font-medium">顺时养生 · 赤诚与人</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#FF6B35]/5" />
                <div className="text-center p-8 relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E85A2D] flex items-center justify-center text-white text-3xl shadow-xl shadow-orange-200">
                    礼
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">赤橙礼</h3>
                  <p className="text-gray-500">CHI CHENG LI</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FF6B35]/10 rounded-full blur-2xl" />
            </div>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1A1A1A]">为什么是「赤橙」？</h3>
                <p className="text-gray-600 leading-relaxed">
                  赤，是东方五正色之首，代表本心、真诚与生命力；橙，是日出与成熟的色彩，温暖而不灼热。
                  赤橙相合，寓意我们以赤诚之心，奉上顺应天时的养生之礼。
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1A1A1A]">为什么是「礼」？</h3>
                <p className="text-gray-600 leading-relaxed">
                  礼，不仅是馈赠，更是对待身体与生活的态度。二十四节气是祖先留给我们的时间礼物，
                  我们将其转化为可感知、可使用的当代养生方案，让传统智慧真正融入日常。
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-[#FFF8F0] border border-[#F5E6D3]">
                <p className="text-[#1A1A1A] font-serif text-lg italic leading-relaxed">
                  我们相信，养生不是老年人的专利，而是每个现代人对自我的温柔关照。
                  顺时而食，顺时而居，顺时而心——这是赤橙礼想带给你的世界。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// 24节气体系
function SolarTerms() {
  const terms = [
    { name: '立春', season: '春', icon: <Leaf size={20} />, desc: '养肝护阳，疏肝理气', color: 'from-green-400 to-emerald-500' },
    { name: '雨水', season: '春', icon: <Droplets size={20} />, desc: '健脾祛湿，调养脾胃', color: 'from-blue-400 to-cyan-500' },
    { name: '惊蛰', season: '春', icon: <Sun size={20} />, desc: '清肝明目，滋阴润燥', color: 'from-yellow-400 to-orange-400' },
    { name: '春分', season: '春', icon: <Wind size={20} />, desc: '阴阳平衡，调和气血', color: 'from-teal-400 to-green-400' },
    { name: '立夏', season: '夏', icon: <Sun size={20} />, desc: '养心清火，清淡饮食', color: 'from-orange-400 to-red-400' },
    { name: '小满', season: '夏', icon: <Droplets size={20} />, desc: '清热利湿，养护心脾', color: 'from-blue-400 to-indigo-400' },
    { name: '芒种', season: '夏', icon: <Leaf size={20} />, desc: '生津止渴，解暑降温', color: 'from-green-500 to-teal-500' },
    { name: '夏至', season: '夏', icon: <Sun size={20} />, desc: '冬病夏治，温阳散寒', color: 'from-red-400 to-pink-500' },
    { name: '立秋', season: '秋', icon: <Wind size={20} />, desc: '滋阴润肺，防燥护阴', color: 'from-amber-400 to-yellow-500' },
    { name: '白露', season: '秋', icon: <Droplets size={20} />, desc: '润燥养肺，早睡早起', color: 'from-blue-300 to-blue-500' },
    { name: '寒露', season: '秋', icon: <Leaf size={20} />, desc: '保暖防寒，温润进补', color: 'from-orange-300 to-amber-500' },
    { name: '霜降', season: '秋', icon: <Snowflake size={20} />, desc: '平补润燥，养护脾胃', color: 'from-gray-400 to-slate-500' },
  ]
  
  return (
    <section id="solar" className="py-32 bg-[#FFF8F0] px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4">二十四节气养生</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              每个节气都有对应的身体信号，也有专属的调养方案。赤橙礼以节气为轴，为你定制全年养生日历。
            </p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {terms.map((term, i) => (
            <Reveal key={term.name} delay={i * 0.05}>
              <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#FF6B35]/30 hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${term.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {term.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{term.name}</h3>
                <p className="text-xs text-[#FF6B35] font-medium mb-2">{term.season}季</p>
                <p className="text-sm text-gray-500">{term.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.6}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-600 text-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
              更多节气方案持续更新中，订阅获取全年养生日历
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// 产品系列
function Products() {
  const products = [
    {
      tag: '立春限定',
      name: '春生·养肝茶方',
      desc: '玫瑰花、枸杞、菊花配伍，疏肝理气，唤醒春日生机',
      price: '¥168',
      unit: '/盒（15包）',
      badge: '热销'
    },
    {
      tag: '惊蛰限定',
      name: '惊蛰·清润膏方',
      desc: '雪梨、百合、银耳慢熬，滋阴润燥，应对春燥上火',
      price: '¥218',
      unit: '/瓶（300g）',
      badge: '新品'
    },
    {
      tag: '全年常备',
      name: '顺时·节气礼盒',
      desc: '包含四季节气代表产品，全年养生一盒掌握，送礼自用两相宜',
      price: '¥688',
      unit: '/套',
      badge: '礼盒'
    },
    {
      tag: '会员专享',
      name: '赤橙礼·年度会员',
      desc: '全年24节气产品直送家门，专属养生顾问1对1服务，新品优先体验',
      price: '¥2,980',
      unit: '/年',
      badge: 'VIP'
    }
  ]
  
  return (
    <section id="products" className="py-32 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4">节气产品系列</h2>
            <p className="text-gray-500">顺应天时，以自然之物养自然之身</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={i * 0.1}>
              <div className="group bg-[#FFF8F0] rounded-3xl overflow-hidden border border-[#F5E6D3] hover:border-[#FF6B35]/30 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-500">
                <div className="aspect-square bg-gradient-to-br from-[#F5E6D3] to-[#FFF8F0] flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                    {i === 0 ? '🍵' : i === 1 ? '🍐' : i === 2 ? '🎁' : '👑'}
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF6B35] text-white text-xs font-bold">
                    {product.badge}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-[#FF6B35] text-xs font-medium">
                    {product.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{product.desc}</p>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#FF6B35]">{product.price}</span>
                      <span className="text-sm text-gray-400">{product.unit}</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-[#FF6B35] hover:bg-[#E85A2D] text-white flex items-center justify-center transition-all hover:scale-110">
                      <ShoppingBag size={18} />
                    </button>
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

// 合作洽谈
function Cooperation() {
  const [ref, visible] = useCoopReveal()
  const [submitted, setSubmitted] = useState(false)
  const [formType, setFormType] = useState('b2b')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }
  
  return (
    <section id="coop" className="py-32 bg-[#FFF8F0] px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4">与赤橙礼<span className="text-[#FF6B35]">同行</span></h2>
            <p className="text-gray-500">无论是企业礼品定制、渠道合作，还是加盟共创，我们期待与你连接</p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-orange-100/30 overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setFormType('b2b')}
                className={`flex-1 py-4 text-center font-medium transition-all ${formType === 'b2b' ? 'text-[#FF6B35] border-b-2 border-[#FF6B35] bg-[#FFF8F0]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                B端企业合作
              </button>
              <button 
                onClick={() => setFormType('franchise')}
                className={`flex-1 py-4 text-center font-medium transition-all ${formType === 'franchise' ? 'text-[#FF6B35] border-b-2 border-[#FF6B35] bg-[#FFF8F0]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                渠道加盟咨询
              </button>
            </div>
            
            <div className="p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FF6B35]/10 flex items-center justify-center"
                  >
                    <Heart size={40} className="text-[#FF6B35]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">已收到您的意向</h3>
                  <p className="text-gray-500">赤橙礼商务团队将在24小时内与您联系</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600 font-medium">联系人姓名</label>
                      <input required type="text" placeholder="请输入姓名" className="w-full bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600 font-medium">公司名称</label>
                      <input required type="text" placeholder="请输入公司名" className="w-full bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">联系电话</label>
                    <input required type="tel" placeholder="请输入手机号" className="w-full bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">合作类型</label>
                    <select required className="w-full bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 transition-all appearance-none">
                      <option value="">{formType === 'b2b' ? '请选择企业合作类型' : '请选择加盟类型'}</option>
                      {formType === 'b2b' ? (
                        <>
                          <option value="gift">节气礼品定制</option>
                          <option value="channel">渠道分销合作</option>
                          <option value="oem">产品联名/OEM</option>
                          <option value="activity">企业养生活动</option>
                        </>
                      ) : (
                        <>
                          <option value="store">线下体验店加盟</option>
                          <option value="online">线上分销代理</option>
                          <option value="studio">养生工作室合作</option>
                        </>
                      )}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">需求描述</label>
                    <textarea rows={4} placeholder="请简述您的合作需求、预期规模或特殊要求..." className="w-full bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 transition-all resize-none" />
                  </div>
                  
                  <button type="submit" className="w-full py-4 bg-[#FF6B35] hover:bg-[#E85A2D] text-white rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-orange-200/50 active:scale-[0.98]">
                    提交合作意向
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center">
                    提交即表示同意赤橙礼商务合作条款，您的信息将严格保密
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.4}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#FF6B35]/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500">商务邮箱</div>
                <div className="text-[#1A1A1A] font-medium">bd@chichengli.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#FF6B35]/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500">合作热线</div>
                <div className="text-[#1A1A1A] font-medium">400-888-XXXX</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#FF6B35]/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500">总部地址</div>
                <div className="text-[#1A1A1A] font-medium">杭州市XXXX</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 bg-[#1A1A1A] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#E85A2D] flex items-center justify-center text-white font-bold text-sm">
                赤
              </div>
              <span className="text-xl font-bold text-white">赤橙礼</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm mb-6">
              顺时养生，赤诚与人。以二十四节气为纲，将东方草木智慧融入当代生活，为现代都市人重建与自然的温柔契约。
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] transition-colors cursor-pointer">
                <span className="text-sm">微信</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] transition-colors cursor-pointer">
                <span className="text-sm">微博</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] transition-colors cursor-pointer">
                <span className="text-sm">小红书</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">产品系列</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">节气茶方</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">养生膏方</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">节气礼盒</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">年度会员</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">关于赤橙礼</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">品牌故事</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">节气哲学</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">商务合作</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">加入我们</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
             赤橙礼（杭州）健康科技有限公司 版权所有
          </div>
          <div className="text-gray-600 text-sm">
            浙ICP备XXXXXXXX号
          </div>
        </div>
      </div>
    </footer>
  )
}

// 主App
function App() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen text-[#1A1A1A] antialiased selection:bg-[#FF6B35] selection:text-white">
      <Navbar />
      <Hero />
      <BrandStory />
      <SolarTerms />
      <Products />
      <Cooperation />
      <Footer />
    </div>
  )
}

export default App