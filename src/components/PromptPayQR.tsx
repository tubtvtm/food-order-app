interface PromptPayQRProps {
  amount: number;
}

export default function PromptPayQR({ amount }: PromptPayQRProps) {
  const promptpayNumber = "0937366799"
  const qrUrl = `https://promptpay.io/${promptpayNumber}/${amount}`

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-2 rounded-xl">
      <img
        src={qrUrl}
        alt="PromptPay QR Code"
        className="w-64 h-64"
      />
      <div className="text-center">
        <p className="text-sm text-gray-600">สแกนเพื่อจ่ายเงิน {amount} บาท</p>
        <p className="text-xs text-gray-500">PromptPay: {promptpayNumber}</p>
      </div>
    </div>
  )
}