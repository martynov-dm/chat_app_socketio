import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import ThemeToggler from './ThemeToggler'
import { css } from '@emotion/react'

const SpinnerSuspense = () => {
  return (
    <>
      <ThemeToggler />
      <Box w="100%" h="100%" position="relative">
        <Spinner
          ml={50}
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.200"
          size="xl"
          data-testid="spinner"
          css={css`
            position: absolute;
            top: 25%;
            left: 45%;
            transform: translate(-50%, -50%);
          `}
        />
      </Box>
    </>
  )
}

export default SpinnerSuspense
