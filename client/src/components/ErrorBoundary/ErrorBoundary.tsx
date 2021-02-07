import { Heading } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

const IMAGE_URL = 'https://i.imgur.com/lKJiT77.png'

// export const ErrorImageText = styled.h2`
//   font-size: 28px;
//   color: #2f8e89;
// `

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          css={css`
            height: 60vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            css={css`
              display: inline-block;
              background-image: url(${IMAGE_URL});
              background-size: cover;
              background-position: center;
              width: 40vh;
              height: 40vh;
            `}
          ></div>

          <Heading>A Dog Ate this Page</Heading>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
