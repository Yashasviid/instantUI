function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: 6,
        padding: "8px 16px",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background-color 0.2s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
    >
      {label}
    </button>
  )
}

export default Button