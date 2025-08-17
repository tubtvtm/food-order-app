import mongoose from 'mongoose'

interface IMenu {
  name: string;
  description: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
  category: string;
  available: boolean;
  options?: {
    [key: string]: string[];
  };
}

const menuSchema = new mongoose.Schema<IMenu>({
  name: {
    type: String,
    required: [true, 'Please add a menu name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  image: {
    src: {
      type: String,
      required: [true, 'Please add an image source'],
    },
    alt: {
      type: String,
      required: [true, 'Please add image alt text'],
    }
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['pizza', 'burger', 'noodle', 'drink']
  },
  available: {
    type: Boolean,
    default: true
  },
  options: {
    type: Map,
    of: [String],
    default: {}
  }
}, {
  timestamps: true
})

export default mongoose.model<IMenu>('Menu', menuSchema)