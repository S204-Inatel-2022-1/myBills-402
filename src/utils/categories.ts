export const categories = [
    { id: 1, label: "Comida", value: "food" },
    { id: 2, label: "Vestuário", value: "clothing" },
    { id: 3, label: "Lazer", value: "entertainment" },
    { id: 4, label: "Saúde", value: "health" },
    { id: 5, label: "Moradia", value: "house" },
    { id: 6, label: "Transporte", value: "transport" },
    { id: 7, label: "Educação", value: "education" },
    { id: 8, label: "Dívida", value: "debt" },
    { id: 9, label: "Outros", value: "other" },
  ]

export const getCategory = (value: String) => {
    const category = categories.find(category => category.value === value)
    return category ? category.label : "Outros"
}