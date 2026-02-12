function Table({ columns, data }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse"
      }}
    >
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f3f4f6"
              }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px"
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
