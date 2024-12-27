interface ProductPriceProps {
  price: number;
  discountPrice?: number;
  currency?: string;
}

export function ProductPrice({ price, discountPrice, currency = "USD" }: ProductPriceProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="flex items-center gap-2">
      {discountPrice && discountPrice < price ? (
        <>
          <span className="text-2xl font-bold">{formatPrice(discountPrice)}</span>
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(price)}
          </span>
        </>
      ) : (
        <span className="text-2xl font-bold">{formatPrice(price)}</span>
      )}
    </div>
  );
}