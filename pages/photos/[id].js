import { getPhotoById } from '../../lib/api'
import {
  Box,
  Divider,
  Center,
  Text,
  Flex,
  Spacer,
  Button,
  Skeleton,
} from '@chakra-ui/react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { InfoIcon, AtSignIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export default function Photos({ pic }) {
  const [load, setLoad] = useState(false)
  const handleLoad = () => {
    setLoad(true)
    console.log('Loaded')
  }
  return (
    <Box p='2rem' bg='#fbfbfb' minH='100vh'>
      <Head>
        <title> Image: {pic.id}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex px='1rem' justify='center' align='center'>
        <Text
          letterSpacing='wide'
          textDecoration='underline'
          as='h2'
          fontWeight='semibold'
          fontSize='xl'
          as='a'
          target='_blank'
          href={pic.photographer_url}
        >
          <AtSignIcon />
          {pic.photographer}
        </Text>
        <Spacer />
        <Box as='a' target='_blank' href={pic.url}>
          <InfoIcon focusable='true' boxSize='2rem' color='red.500' />{' '}
        </Box>{' '}
        <Spacer />
        <Link href={`/`}>
          <Button
            as='a'
            borderRadius='full'
            bg='#DD835D'
            fontSize='lg'
            size='lg'
            cursor='pointer'
            _hover={{ bg: '#DD735E' }}
            color='white'
          >
            🏠 Home
          </Button>
        </Link>
      </Flex>
      <Divider my='1rem' />

      <Center>
        <Box as='a' target='_blank' href={pic.url}>
          {}
          {!load && <Skeleton height={pic.height / 4} />}
          <Image
            src={pic.src.original}
            width={pic.width / 4}
            height={pic.height / 4}
            quality={50}
            priority
            loading='eager'
            onLoad={handleLoad}
          />
        </Box>
      </Center>
    </Box>
  )
}

export async function getServerSideProps({ params }) {
  console.log(params)
  const pic = await getPhotoById(params.id)
  return {
    props: {
      pic,
    },
  }
}
