function Input({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px 12px",
        backgroundColor: "#0f172a",
        border: "1px solid #1f2937",
        borderRadius: 8,
        color: "#e5e7eb",
        fontSize: 13,
        outline: "none",
        boxSizing: "border-box"
      }}
    />
  )
}

export default Input