const programFormat = {
  id: new Date().getTime(),
  // 解析整体输出保存
  htmlJson: {},
  // 递归保存
  childJson: {},
  init (html, htmlJson) {
    if (!htmlJson) htmlJson = this.childJson = this.htmlJson
    else this.childJson = htmlJson
    const tagStart = new RegExp(this.tagStartReg(true))
    let tag
    const tagNameStart = this.getTagName(html, tagStart, name => {
      tag = name
    })
    const tagEnd = new RegExp(this.tagEndReg(tagNameStart, true))
    
    const result = this.isTagClose(html, tagEnd)
    if (!result) this.textError()
    // 添加标签名
    // htmlJson.id = this.id
    htmlJson.name = tagNameStart
    // 添加属性
    const attrs = this.getTagAttr(tag)
    attrs && (htmlJson.attrs = attrs)
    // const children = this.getContent(html.replace(tagStart, '').replace(tagEnd, ''))
    // if (children) htmlJson.children = children
    this.getContent(html.replace(tagStart, '').replace(tagEnd, ''))
  },
  // 获取标签名
  getTagName (html, tagStart, cb) {
    return tagStart.test(html) ? this.getTag(html, tagStart, (match, $1) => {
      cb && cb(match)
      return `${$1}#-#`
    }, '#-#') : this.textError()
  },
  // 获取标签属性类
  getTagAttr (tag) {
    const classReg = new RegExp(/class?=['|"]([\w\d\s\_\-]*)['|"]/)
    const styleReg = new RegExp(/style?=['|"]([\w\d\s\_\-#:;]*)['|"]/)
    const css = this.getVal(tag, classReg)
    const style = this.getVal(tag, styleReg)
    const attrs = {}
    css && (attrs.css = css)
    style && (attrs.style = style)
    if (attrs.css || attrs.style) return attrs
    return false
  },
  // 获取属性值
  getVal (tag, reg) {
    const val = tag.match(reg)
    if (val) return val[1]
    return false
  },
  // 匹配标签开始
  tagStartReg (s) {
    return s ? /^<(\w+)[\s\w\=\"\'\/:\.\#\(\)\;\_\-]*>/ : /<(\w+)[\s\w\=\"\'\/:\.\#\(\)\;\_\-]*>/
  },
  // 匹配标签结束
   tagEndReg (tagNameStart, s) {
    return s ? `<\/${tagNameStart}>$` : `<\/${tagNameStart}>`
  },
  // 文件格式错误
  textError () {
    throw new Error('标签不匹配')
  },
  // 获取标签
  getTag (html, reg, cb, hash) {
    const str = html.replace(reg, cb)
    return hash ? str.split(hash)[0] : str
  },
  // 验证标签关门
  isTagClose (html, reg) {
    if (reg.test(html)) return true
    return false
  },
  // 获取内容
  getContent (content) {
    if (!content) return false
    this.textChangeArr(content)
  },
  // 内容分组
  textChangeArr (html) {
    if (!this.childJson.children) this.childJson.children = []
    let str = html
    // TODO
    // while (str) {
      const s = str.match(this.tagStartReg())
      if (s === null) {
        this.childJson.children.push(this.createChild('text', str))
        return
      }
      console.log(s.index)
      if (s.index > 0) {
        this.childJson.children.push(this.createChild('text', str.substr(0, s.index)))
        str = str.substr(s.index)
        this.textChangeArr(str)
        return
      }
      const tagName = this.getTagName(str, this.tagStartReg())
      const sIndex = str.match(this.tagStartReg())
      const eIndex = str.match(this.tagEndReg(tagName))

      if (sIndex.index < eIndex.index) {
        const len = this.childJson.children.push({})
        const txt = str.substr(sIndex.index, eIndex.index + eIndex[0].length)
        const reg = new RegExp(txt)
        this.init(txt, this.childJson.children[len - 1])
        str = str.replace(reg, '')
      }
      console.log(str, '@@@@@@@@@')
    // }

    // const s = html.match(this.tagStartReg())
    // if (!s) {
    //   this.childJson.children.push(this.createChild('text', html))
    //   return
    // }
    // if (s !== 0) this.childJson.children.push(this.createChild('text', html.substr(0, s.index)))
    // let str = html.substr(s.index)
    // while (str) {
    //   const tagName = this.getTagName(str, this.tagStartReg())
    //   console.log(str)
    //   const sIndex = str.match(this.tagStartReg())
    //   const eIndex = str.match(this.tagEndReg(tagName))

    //   if (sIndex.index < eIndex.index) {
    //     const len = this.childJson.children.push({})
    //     const txt = str.substr(sIndex.index, eIndex.index + eIndex[0].length)
    //     programFormat.init(txt, this.childJson.children[len - 1])
    //     const reg = new RegExp(txt)
    //     str = str.replace(reg, '')
    //   }
    //   console.log(this.htmlJson)
    //   console.log(str)
    // }
  },
  //创建节点
  createChild (type, text) {
    return {
      type,
      text
    }
  }
}
















const htmlJson = {}
function programFormat (html) {
  const tagStart = new RegExp(tagStartReg(true))
  let tag
  const tagNameStart = getTagName(html, tagStart, name => {
    tag = name
  })
  const tagEnd = new RegExp(tagEndReg(tagNameStart, true))
  
  const result = isTagClose(html, tagEnd)
  if (!result) textError()
  // 添加标签名
  htmlJson.name = tagNameStart
  // 添加属性
  const attrs = getTagAttr(tag)
  attrs && (htmlJson.attrs = attrs)
  const children = getContent(html.replace(tagStart, '').replace(tagEnd, ''))
  if (children) {
    // if (!htmlJson.children) htmlJson.children = []
    // htmlJson.children.push(children)
    htmlJson.children = children
  }
}

// 获取标签名
function getTagName (html, tagStart, cb) {
  return tagStart.test(html) ? getTag(html, tagStart, (match, $1) => {
    cb && cb(match)
    return `${$1}#-#`
  }, '#-#') : textError()
}

// 匹配标签开始
function tagStartReg (s) {
  return s ? /^<(\w+)[\s\w\=\"\'\/:\.\#\(\)\;\_\-]*>/ : /<(\w+)[\s\w\=\"\'\/:\.\#\(\)\;\_\-]*>/
}
// 匹配标签结束
function tagEndReg (tagNameStart, s) {
  return s ? `<\/${tagNameStart}>$` : `<\/${tagNameStart}>`
}

// 文件格式错误
function textError () {
  throw new Error('标签不匹配')
}

// 获取标签
function getTag (html, reg, cb, hash) {
  const str = html.replace(reg, cb)
  return hash ? str.split(hash)[0] : str
}

// 获取标签属性类
function getTagAttr (tag) {
  const classReg = new RegExp(/class?=['|"]([\w\d\s\_\-]*)['|"]/)
  const styleReg = new RegExp(/style?=['|"]([\w\d\s\_\-#:;]*)['|"]/)
  const css = getVal(tag, classReg)
  const style = getVal(tag, styleReg)
  const attrs = {}
  css && (attrs.css = css)
  style && (attrs.style = style)
  if (attrs.css || attrs.style) return attrs
  return false
}

// 获取属性值
function getVal (tag, reg) {
  const val = tag.match(reg)
  if (val) return val[1]
  return false
}

// 验证标签关门
function isTagClose (html, reg) {
  if (reg.test(html)) return true
  return false
}

// 获取内容
function getContent (content) {
  if (!content) return false
  const s = content.match(tagStartReg())
  return textChangeArr(content)
  // if (!s) return createChild('text', content)
  // if (s !== 0) return createChild('text', content.substring(0, s.index))
}

// 内容分组
function textChangeArr (html) {
  const child = []
  const s = html.match(tagStartReg())
  if (!s) {
    child.push(createChild('text', html))
    return child
  }
  const str = html.substr(s.index)
  const tagName = getTagName(str, tagStartReg())

  const sIndex = str.match(tagStartReg())
  const eIndex = str.match(tagEndReg(tagName))

  if (s !== 0) child.push(createChild('text', html.substr(0, sIndex.index)))
  // console.log(html)
  // console.log(str.substr(sIndex.index, eIndex.index + eIndex[0].length))
  if (sIndex.index < eIndex.index) {
    programFormat(str.substr(sIndex.index, eIndex.index + eIndex[0].length))
  }
  // getTagName
}

// 创建children
function createObject () {

}

//创建节点
function createChild (type, text) {
  return {
    type,
    text
  }
}

programFormat(str)