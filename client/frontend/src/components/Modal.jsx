function Modal({ isOpen, title, children }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "6px",
          width: "400px"
        }}
      >
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Modal
