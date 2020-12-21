import React from 'react'
import styled from 'styled-components'

const MessageStyles = styled.div`
  padding: 0.2rem;
  display: flex;
  width: 100%;
  min-height: 3rem;
  align-items: center;

  .text {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;

    .message {
      line-height: 1.4rem;
      white-space: pre-wrap;
      color: rgba(0, 0, 0, 0.8);
      font-size: 1.1rem;
    }

    .name-date {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.3rem;
      color: rgba(0, 0, 0, 0.65);
      .date {
        margin-left: 0.7rem;
      }
      .name {
      }
    }
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`

const MessageItem = () => {
  return (
    <MessageStyles>
      <img
        src='https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg'
        alt='ava'
      />
      <div className='text'>
        <div className='name-date'>
          <div className='name'>Dmitrii Martynov</div>
          <div className='date'>2020/11/26</div>
        </div>

        <span className='message'>My Message</span>
      </div>
    </MessageStyles>
  )
}

export default MessageItem
