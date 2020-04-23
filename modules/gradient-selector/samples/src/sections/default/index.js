import { query } from '@pluginjs/dom'
import GradientSelector from '@pluginjs/gradient-selector'

const data = {
  "African Field": {name: "African Field", gradient: "linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%)"},
  "Alchemist Lab": {name: "Alchemist Lab", gradient: "linear-gradient(-20deg, #d558c8 0%, #24d292 100%)"},
  "Amour Amour": {name: "Amour Amour", gradient: "linear-gradient(to top, #f77062 0%, #fe5196 100%)"},
  "Amy Crisp": {name: "Amy Crisp", gradient: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)"},
  "Angel Care": {name: "Angel Care", gradient: "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)"},
  "Aqua Guidance": {name: "Aqua Guidance", gradient: "linear-gradient(to top, #007adf 0%, #00ecbc 100%)"},
  "Aqua Splash": {name: "Aqua Splash", gradient: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)"},
  "Arielle's Smile": {name: "Arielle's Smile", gradient: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)"},
  "Awesome Pine": {name: "Awesome Pine", gradient: "linear-gradient(to top, #ebbba7 0%, #cfc7f8 100%)"},
  "Big Mango": {name: "Big Mango", gradient: "linear-gradient(to top, #c71d6f 0%, #d09693 100%)"},
  "Black Sea": {name: "Black Sea", gradient: "linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%)"},
  "Blessing": {name: "Blessing", gradient: "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)"},
  "Burning Spring": {name: "Burning Spring", gradient: "linear-gradient(to top, #4fb576 0%, #44c489 30%, #a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%)"},
  "Cheerful Caramel": {name: "Cheerful Caramel", gradient: "linear-gradient(to top, #e6b980 0%, #eacda3 100%)"},
  "Child Care": {name: "Child Care", gradient: "line"},
}

GradientSelector.setData(data)

const element = query('#default .example-default')
GradientSelector.of(element, {})
