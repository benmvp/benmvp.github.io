import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import {
  makeStyles,
  createStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Share from './Share'
import { getBlogUrl } from '../utils'

interface Props {
  hero: any
  heroAlt: string
  title: string
  date: string
  excerpt: string
  slug: string
  tags?: string[]
}

const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      height: 140,
    },
    buttons: {
      flex: 1,
      marginRight: theme.spacing(2),
    },
  }),
)

const PostCard = ({
  hero,
  heroAlt,
  title,
  date,
  excerpt,
  slug,
  tags,
}: Props) => {
  const classes = useStyles()
  const [copyStatus, setCopyStatus] = useState<
    'inactive' | 'copied' | 'failed'
  >('inactive')
  const url = getBlogUrl(slug)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (copyStatus !== 'inactive') {
      timeoutId = setTimeout(() => {
        setCopyStatus('inactive')
      }, 2500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [copyStatus])

  const copy = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        setCopyStatus('copied')
      },
      () => {
        setCopyStatus('failed')
      },
    )
  }

  let copyText = 'Copy URL'
  let copyButtonColor = 'primary'

  if (copyStatus === 'copied') {
    copyText = 'Copied'
    copyButtonColor = 'secondary'
  } else if (copyStatus === 'failed') {
    copyText = 'Failed!'
    copyButtonColor = 'default'
  }

  return (
    <Card>
      <CardActionArea component={Link} to={`/blog${slug}`} underline="none">
        {hero && (
          <CardMedia
            component="img"
            image={hero.childImageSharp.fluid.src}
            title={heroAlt}
            className={classes.media}
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            color="textPrimary"
            component="h2"
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textPrimary"
            component="h3"
          >
            {date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box className={classes.buttons}>
          <Button size="small" color={copyButtonColor} onClick={copy}>
            {copyText}
          </Button>
        </Box>
        <Share
          iconSize={32}
          summary={excerpt}
          tags={tags}
          title={title}
          url={url}
          options={new Set(['twitter', 'facebook', 'pocket'])}
        />
      </CardActions>
    </Card>
  )
}

export default PostCard
