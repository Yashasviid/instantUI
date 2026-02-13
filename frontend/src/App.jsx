import React, { useState } from 'react'
import Sidebar from "./components/Sidebar"
import Card from "./components/card"
import Button from "./components/button"
import Input from "./components/Input"

function App() {
  const [intent, setIntent] = useState("")
  const [generatedCode, setGeneratedCode] = useState(
    `// UI code will appear here.\n// Example:\n// <Card title="Dashboard">\n//   <Table columns={["Name", "Status"]} data={[["Task A", "Done"]]} />\n// </Card>`
  )
  const [explanation, setExplanation] = useState("")
  const [versions, setVersions] = useState([])
  const [plan, setPlan] = useState(null)

  async function handleGenerate() {
    if (!intent.trim()) return

    try {
      console.log("🔄 Calling backend with:", intent)
      const response = await fetch("https://instantui-backend-lea0kljxp-yashasviids-projects.vercel.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent })
      })

      const data = await response.json()
      console.log("📦 Backend response:", data)

      if (!data.success) {
        console.error("Generation failed:", data.error)
        return
      }

      setGeneratedCode(data.code)
      setExplanation(data.explanation)
      setPlan(data.plan)

      setVersions((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          intent,
          code: data.code,
          explanation: data.explanation,
          preview: data.preview,
          plan: data.plan,
          timestamp: new Date().toLocaleString()
        }
      ])

      setIntent("")
    } catch (err) {
      console.error("❌ Backend failed:", err)
      alert("Cannot connect to backend! Make sure it's running on port 3001")
    }
  }

  function loadVersion(version) {
    setGeneratedCode(version.code)
    setExplanation(version.explanation)
    setPlan(version.plan)
    setIntent(version.intent)
  }

  // ICONS (CATEGORIES LIST)
  const getIconForTitle = (title) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('uber') || titleLower.includes('ride') || titleLower.includes('car')) return '🚗'
    if (titleLower.includes('bitcoin') || titleLower.includes('crypto')) return '₿'
    if (titleLower.includes('ethereum')) return 'Ξ'
    if (titleLower.includes('coffee') || titleLower.includes('starbucks')) return '☕'
    if (titleLower.includes('restaurant') || titleLower.includes('menu')) return '🍽️'
    if (titleLower.includes('product') || titleLower.includes('shop') || titleLower.includes('store')) return '🛍️'
    if (titleLower.includes('weather')) return '☀️'
    if (titleLower.includes('task') || titleLower.includes('todo')) return '📝'
    if (titleLower.includes('habit') || titleLower.includes('tracker')) return '✅'
    if (titleLower.includes('fitness') || titleLower.includes('workout')) return '💪'
    return '✨'
  }

  //  UNIVERSAL COLOR DETECTOR 
  const getThemeColors = (title, i = 0) => {
    const lower = title.toLowerCase()
    
    const colorMap = {
      pink: { primary: '#FF1493', shades: ['#FFB6C1', '#FF69B4', '#FF9FD6', '#FEBDE2', '#FED9E9'] },
      barbie: { primary: '#FF69B4', shades: ['#FF1493', '#FFB6C1', '#FF9FD6', '#FEBDE2', '#C693EC'] },
      blue: { primary: '#1E3A8A', shades: ['#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6'] },
      uber: { primary: '#2196F3', shades: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#42A5F5', '#1976D2'] },
      green: { primary: '#15803D', shades: ['#D1FAE5', '#A7F3D0', '#86EFAC', '#4ADE80', '#22C55E'] },
      crypto: { primary: '#16A34A', shades: ['#ECFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#10B981'] },
      starbucks: { primary: '#2E7D32', shades: ['#E8F5E8', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'] }
    }

    for (const [key, theme] of Object.entries(colorMap)) {
      if (lower.includes(key)) {
        const shade = theme.shades[i % theme.shades.length]
        return {
          bg: shade + 'CC',
          border: theme.primary + 'FF',
          gradient: `linear-gradient(135deg, ${theme.primary}CC, ${shade}FF)`,
          button: `linear-gradient(135deg, ${theme.primary}, ${shade.replace('FF','DD')})`
        }
      }
    }

    const rainbow = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#F9CA24', '#F0932B', '#EB4D4B']
    const color = rainbow[i % rainbow.length]
    return {
      bg: color + 'CC',
      border: color + 'FF',
      gradient: `linear-gradient(135deg, ${color}CC, ${color}88)`,
      button: `linear-gradient(135deg, ${color}DD, ${color}88)`
    }
  }

  return (
    <div style={{
      display: "flex", minHeight: "100vh", backgroundColor: "#020617",
      color: "#e5e7eb", fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* LEFT: Sidebar */}
      <Sidebar>
        <Card title="AI UI Generator">
          <div style={{ fontSize: 12, marginBottom: 8, color: "#9ca3af", lineHeight: 1.4 }}>
            Describe a UI in plain English and generate deterministic React UI.
          </div>

          <Input placeholder="uber clone, crypto dashboard..." value={intent} onChange={(e) => setIntent(e.target.value)} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button label="Generate UI" onClick={handleGenerate} />
          </div>

          {versions.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e5e7eb", marginBottom: 8 }}>
                Version History
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {versions.slice().reverse().map((version) => (
                  <div key={version.id} onClick={() => loadVersion(version)} style={{
                    padding: "8px 12px", backgroundColor: "#0f172a", borderRadius: 6,
                    fontSize: 11, color: "#9ca3af", cursor: "pointer", border: "1px solid #1f2937",
                    transition: "all 0.2s"
                  }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.backgroundColor = "#1e293b"; 
                      e.currentTarget.style.borderColor = "#3b82f6"; 
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.backgroundColor = "#0f172a"; 
                      e.currentTarget.style.borderColor = "#1f2937"; 
                    }}>
                    <div style={{ fontWeight: 500, color: "#e5e7eb" }}>
                      v{version.id}: {version.intent.substring(0, 30)}{version.intent.length > 30 ? "..." : ""}
                    </div>
                    <div style={{ fontSize: 10, marginTop: 2 }}>{version.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </Sidebar>

      {/* RIGHT: Main content */}
      <div style={{ flex: 1, padding: "20px 28px", boxSizing: "border-box", overflowY: "auto", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 980, display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* CODE */}
          <Card title="Generated Code">
            <pre style={{
              margin: 0, backgroundColor: "#0f172a", color: "#e5e7eb", padding: 16,
              borderRadius: 10, minHeight: 180, maxHeight: 260, fontSize: 13, overflow: "auto",
              border: "1px solid #1f2937", fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
            }}>
              {generatedCode}
            </pre>
            {explanation && (
              <div style={{ marginTop: 12, padding: 12, backgroundColor: "#0f172a", borderRadius: 8, fontSize: 12, color: "#9ca3af", border: "1px solid #1f2937" }}>
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>✓ </span>{explanation}
              </div>
            )}
          </Card>

          {/* LIVE PREVIEW */}
          <Card title="Live Preview">
            <div style={{
              minHeight: 500, padding: 24, position: "relative", overflow: "hidden",
              background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
              borderRadius: 20, backdropFilter: "blur(20px)"
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 6,
                background: "linear-gradient(90deg, #FF6B9D, #4ECDC4, #45B7D1, #F9CA24, #EB4D4B)",
                backgroundSize: "400% 400%", animation: "gradientShift 4s ease infinite"
              }} />

              {plan?.components?.length > 0 ? (
                <>
                  {/* NAVBAR */}
                  {plan.components.find(c => c.type === 'Navbar') && (() => {
                    const navTheme = getThemeColors(intent || plan.components.find(c => c.type === 'Navbar')?.props?.title)
                    return (
                      <div style={{
                        background: navTheme.gradient, padding: "28px 36px", borderRadius: 24, marginBottom: 32,
                        color: "white", fontWeight: 900, fontSize: 26, textAlign: "center",
                        boxShadow: `0 25px 70px ${navTheme.border}55`, backdropFilter: "blur(40px)",
                        border: `2px solid ${navTheme.border}88`
                      }}>
                        {getIconForTitle(plan.components.find(c => c.type === 'Navbar')?.props?.title)} 
                        {plan.components.find(c => c.type === 'Navbar')?.props?.title}
                      </div>
                    )
                  })()}

                  {/* THEMED CARDS */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 32 }}>
                    {plan.components.filter(c => c.type === 'Card').slice(0, 6).map((card, i) => {
                      const theme = getThemeColors(card.props?.title || intent, i)
                      
                      return (
                        <div key={i} style={{
                          background: `${theme.gradient}, linear-gradient(145deg, ${theme.bg}, ${theme.bg.replace('CC','88')})`,
                          backdropFilter: "blur(50px)", padding: 40, borderRadius: 32,
                          border: `3px solid ${theme.border}DD`, boxShadow: `0 40px 100px ${theme.bg}66`,
                          position: "relative", overflow: "hidden", cursor: "pointer"
                        }} 
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-20px) scale(1.02)"
                          e.currentTarget.style.boxShadow = `0 60px 120px ${theme.border}77`
                        }} 
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)"
                          e.currentTarget.style.boxShadow = `0 40px 100px ${theme.bg}66`
                        }}>
                          
                          <div style={{
                            position: "absolute", inset: -4, background: theme.gradient,
                            borderRadius: "36px", filter: "blur(30px)", zIndex: -1, opacity: 0.6
                          }} />
                          
                          <div style={{
                            fontSize: 28, fontWeight: 900, marginBottom: 36, color: "white",
                            textShadow: "0 6px 20px rgba(0,0,0,0.6)", display: "flex", alignItems: "center",
                            justifyContent: "center", gap: 20, letterSpacing: "0.5px"
                          }}>
                            {getIconForTitle(card.props?.title || '')} 
                            {card.props?.title || `Section ${i+1}`}
                          </div>
                          
                          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            {card.children?.slice(0, 3).map((child, j) => 
                              child.type === 'Button' && (
                                <button key={j} style={{
                                  background: theme.button, color: "white", border: "none",
                                  padding: "22px 40px", borderRadius: 24, fontWeight: 900,
                                  fontSize: 18, letterSpacing: "1px", boxShadow: `0 25px 60px ${theme.border}77`,
                                  cursor: "pointer", position: "relative", overflow: "hidden"
                                }} onMouseEnter={e => {
                                  e.target.style.transform = "scale(1.1) translateY(-8px)"
                                  e.target.style.boxShadow = `0 40px 90px ${theme.border}88`
                                }} onMouseLeave={e => {
                                  e.target.style.transform = "scale(1) translateY(0)"
                                  e.target.style.boxShadow = `0 25px 60px ${theme.border}77`
                                }}>
                                  {child.props?.label || '✨ Explore'}
                                </button>
                              )
                            )}
                            {card.children?.length === 0 && (
                              <div style={{
                                padding: "32px", textAlign: "center", color: "rgba(255,255,255,0.9)",
                                fontSize: 18, fontStyle: "italic", backdropFilter: "blur(30px)"
                              }}>
                                Interactive content ✨
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* ✅ CONTACT AREA  */}
                  <div style={{
                    background: "rgba(255,255,255,0.08)", backdropFilter: "blur(60px)",
                    padding: 48, borderRadius: 36, marginTop: 40, 
                    border: "2px solid rgba(255,255,255,0.15)"
                  }}>
                    <div style={{ 
                      fontSize: 32, fontWeight: 900, marginBottom: 40, color: "white",
                      textAlign: "center", textShadow: "0 4px 16px rgba(0,0,0,0.5)"
                    }}>
                      📧 Get In Touch
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 800, margin: "0 auto" }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: "#e5e7eb" }}>
                          Send us a message
                        </div>
                        <Input placeholder="Your email" style={{ marginBottom: 16 }} />
                        <Input placeholder="Subject" style={{ marginBottom: 16 }} />
                        <textarea 
                          placeholder="Your message..." 
                          style={{
                            width: "100%", height: 120, background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12,
                            color: "white", padding: 16, fontSize: 14, resize: "vertical"
                          }} 
                        />
                        <button style={{
                          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "white",
                          border: "none", padding: "16px 32px", borderRadius: 12, fontWeight: 700,
                          fontSize: 16, marginTop: 16, cursor: "pointer", width: "100%"
                        }}>
                          Send Message
                        </button>
                      </div>
                      
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: "#e5e7eb" }}>
                          Contact Info
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                          <div style={{ fontSize: 20 }}>📧</div>
                          <div>hello@instantui.com</div>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                          <div style={{ fontSize: 20 }}>📱</div>
                          <div>+91 1234567890</div>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                          <div style={{ fontSize: 20 }}>📍</div>
                          <div>Jaipur, Rajasthan</div>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ fontSize: 20 }}>🕒</div>
                          <div>Mon-Fri 9AM-5PM IST</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", paddingTop: 120 }}>
                  <div style={{ fontSize: 48, marginBottom: 24 }}>🎨</div>
                  <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>AI UI Generator</div>
                  <div style={{ fontSize: 18, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
                    Try: "uber clone", "crypto dashboard", "starbucks menu", "pink website"
                  </div>
                </div>
              )}
            </div>
            
            <style>{`
              @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
