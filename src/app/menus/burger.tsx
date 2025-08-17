const burger = {
  name: 'เบอร์เกอร์',
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop',
  price: 129,
  meatOptions: [
    {
      id: 'beef',
      name: 'เนื้อวัว',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop',
      description: 'เนื้อวัวแองกัสย่างจนได้ที่ ฉ่ำๆ ชุ่มๆ'
    },
    {
      id: 'chicken',
      name: 'ไก่',
      image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?q=80&w=1000&auto=format&fit=crop',
      description: 'อกไก่นุ่มๆ ย่างจนหอม'
    },
    {
      id: 'pork',
      name: 'หมู',
      image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=1000&auto=format&fit=crop',
      description: 'หมูสันคอนุ่ม หมักเครื่องเทศพิเศษ'
    },
    {
      id: 'veggie',
      name: 'ผัก',
      image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=1000&auto=format&fit=crop',
      description: 'แพตตี้ผักรวม อุดมด้วยคุณค่าทางอาหาร'
    }
  ],
  extraOptions: ['ชีส', 'เบคอน', 'ไข่ดาว', 'อโวคาโด'],
  bunOptions: ['ขนมปังงา', 'ขนมปังธรรมดา', 'ขนมปังโฮลวีต']
}
  
  export default burger
  