<template>
    <canvas id="captchaCanvas" @click="generateCaptcha" :style="{width, height}"></canvas>
</template>

<script>
export default {
  name: 'Captcha',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    number: {
      type: Number,
      default: 4
    },
    night: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      captcha: ''
    }
  },
  methods: {
    generateCaptcha () {
      const canvas = document.getElementById('captchaCanvas')
      const ctx = canvas.getContext('2d')
      canvas.width = canvas.width
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let captcha = ''
      for (let i = 0; i < this.number; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        captcha += char
        ctx.font = '40px Arial' // 调整字体大小到40px
        ctx.fillStyle = this.night ? '#ffffff' : '#000000'
        ctx.shadowColor = 'rgba(0, 1, 2, 0.5)' // 设置阴影颜色
        ctx.shadowOffsetX = 2 // 设置阴影的水平偏移
        ctx.shadowOffsetY = 2 // 设置阴影的垂直偏移
        ctx.shadowBlur = 4 // 设置阴影的模糊程度
        const x = 60 + i * 30
        const y = 70
        const angle = Math.random() * 0.4 - 0.2 // 随机旋转角度（-0.2到0.2弧度之间）
        ctx.save() // 保存当前状态
        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.fillText(char, 0, 0)
        ctx.restore() // 恢复到之前保存的状态
      }
      // 添加一些随机的横线
      for (let i = 0; i < 30; i++) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        const endX = Math.random() * canvas.width
        const endY = Math.random() * canvas.height
        ctx.strokeStyle = this.night ? '#ffffff' : '#000000'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }
      this.captcha = captcha
      this.$emit('getValue', captcha)
    }
  },
  mounted () {
    this.generateCaptcha()
  },
  watch: {
    night () {
      this.generateCaptcha()
    }
  }
}
</script>

<style scoped>
#captchaCanvas {
    cursor: pointer;
}
</style>
