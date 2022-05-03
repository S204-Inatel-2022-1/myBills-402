import LibCurrencyInput from "react-currency-input-field";

type CurrencyInputProps = {
  data: string;
  setData: (p: string) => void;
};

export function CurrencyInput({ data, setData }: CurrencyInputProps) {
  return (
    <LibCurrencyInput
      max={10000000}
      maxLength={12}
      className="currency-input"
      placeholder="Preço"
      allowNegativeValue={false}
      defaultValue={0}
      decimalsLimit={2}
      value={data}
      intlConfig={{ locale: "pt-BR", currency: "BRL" }}
      onValueChange={(value) => setData(value ? value : "")}
    />
  );
}
