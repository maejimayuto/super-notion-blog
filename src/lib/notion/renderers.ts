import React from 'react'
import components from '../../components/dynamic'

function applyTags(tags = [], children, noPTag = false, key) {
  let child = children

  for (const tag of tags) {
    const props: { [key: string]: any } = { key }
    let tagName = tag[0]

    if (noPTag && tagName === 'p') tagName = React.Fragment
    if (tagName === 'c') {
      tagName = 'code'
      props.style = {
        padding: '0.18rem 0.35rem',
        color: 'rgb(235, 87, 87)',  
        backgroundColor: 'rgb(245, 242, 240)',
        backgroundClip: 'border-box',
        borderRadius: '0.25rem',
        fontSize: '0.8rem',
        lineHeight: '1.3rem',
      }
    }
    if (tagName === '_') {
      tagName = 'span'
      props.className = 'underline'
    }
    if (tagName === 'a') {
      props.href = tag[1]
      // TODO: #81 Actually, instead of changing the style of a in globals.css,
      // it's better to return the component that also manages the state of hover here.
    }
    if (tagName === 'e') {
      tagName = components.Equation
      props.displayMode = false
      child = tag[1]
    }

    child = React.createElement(components[tagName] || tagName, props, child)
  }
  return child
}

export function textBlock(text = [], noPTag = false, mainKey) {
  const children = []
  let key = 0

  for (const textItem of text) {
    key++
    if (textItem.length === 1) {
      children.push(textItem)
      continue
    }
    children.push(applyTags(textItem[1], textItem[0], noPTag, key))
  }
  if (noPTag) {
    return React.createElement(
      React.Fragment,
      { key: mainKey },
      ...children,
      noPTag
    )
  } else {
    return React.createElement(
      'div',
      // TODO: tailwind が適用できなかった
      { style: { margin: '0.08rem 0', padding: '0.16rem 0.12rem' } },
      React.createElement(
        components.p,
        { key: mainKey },
        ...children,
        noPTag
      )
    )
  }
}
