export const formatCurrency = (Number) => {
    const CURRENCY_FORMAT = new Intl.NumberFormat('en-US',{
        currency:"USD",
        style:"currency"
    })
    return CURRENCY_FORMAT.format(Number)
}