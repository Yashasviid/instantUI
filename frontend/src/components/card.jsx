function card({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        borderRadius: 12,
        padding: 16,
        border: "1px solid #1f2937"
      }}
    >
      {title && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#e5e7eb",
            marginBottom: 12,
            paddingBottom: 8,
            borderBottom: "1px solid #1f2937"
          }}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

export default card