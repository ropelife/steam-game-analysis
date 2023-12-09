import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import AppleIcon from '@mui/icons-material/Apple';
import IconButton from '@mui/material/IconButton';
import WindowIcon from '@mui/icons-material/Window';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ListItemIcon } from '@mui/material';
import { GridColumnHeaderParams } from '@mui/x-data-grid';

interface CommonGenreData {
  id: number;
  _id: string;
  totalPlaytime: number;
  totalGames: number;
}

interface MostLikedGamesData {
  name: string;
  header_image: string;
  price: number;
  positive: number;
}

interface TopSellingGamesData {
  name: string;
  header_image: string;
  release_date: string;
  price: number;
}

interface GamesOnDiscountData {
  name: string;
  header_image: string;
  price: number;
  windows: boolean;
  mac: boolean;
  linux: boolean;
  short_description: string;
  discounted_price: string;
  movies: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'cover'
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

async function fetchCommonGenre() {
  try {
    const response = await fetch('http://127.0.0.1:5000/game_genre_analysis');
    const data = await response.json();

    const rowsWithId = data.result.map((row, index) => ({ ...row, id: index + 1 }));

    return rowsWithId;
  } catch (error) {
    throw error;
  }
}

async function fetchMostLikedGames() {
  try {
    const response = await fetch('http://127.0.0.1:5000/most_liked_games');
    const data = await response.json();

    return data.result;
  } catch (error) {
    throw error;
  }
}

async function fetchGamesOnDiscount() {
  try {
    const response = await fetch('http://127.0.0.1:5000/games_on_discount');
    const data = await response.json();

    return data.result;
  } catch (error) {
    throw error;
  }
}

async function fetchTopSellingGames() {
  try {
    const response = await fetch('http://127.0.0.1:5000/top_selling_games');
    const data = await response.json();

    return data.result;
  } catch (error) {
    throw error;
  }
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Rank', width: 180, align: 'center', headerAlign: 'center', sortable: false, renderHeader: (params: GridColumnHeaderParams) => (
      <CustomHeader>{params.colDef.headerName}</CustomHeader>
    ),},
  { field: '_id', headerName: 'Name', width: 300, align: 'center', headerAlign: 'center', sortable: false, renderHeader: (params: GridColumnHeaderParams) => (
      <CustomHeader>{params.colDef.headerName}</CustomHeader>
    ),},
  { field: 'totalPlaytime', headerName: 'Total Playtime', width: 300, align: 'center', headerAlign: 'center', renderHeader: (params: GridColumnHeaderParams) => (
      <CustomHeader>{params.colDef.headerName}</CustomHeader>
    ),},
  {
    field: 'totalGames',
    headerName: 'Total Games',
    type: 'number',
    align: 'center', 
    headerAlign: 'center',
    width: 180,
    headerClassName: 'custom-header',
    renderHeader: (params: GridColumnHeaderParams) => (
      <CustomHeader>{params.colDef.headerName}</CustomHeader>
    ),
  },
];

const CustomHeader = styled('div')`
  font-weight: bold;
  color: black;
  font-size: 18px; 
`;


export default function Home() {
  
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [genreData, setGenreData] = useState<CommonGenreData[]>([]);
  const [mostLikedData, setMostLikedData] = useState<MostLikedGamesData[]>([]);
  const [discountGames, setDiscountGames] = useState<GamesOnDiscountData[]>([]);
  const [topSeller, setTopSellers] = useState<TopSellingGamesData[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch common genre data
        const data = await fetchCommonGenre();
        setGenreData(data);

        //fetch most liked games
        const mostLikedData = await fetchMostLikedGames();
        setMostLikedData(mostLikedData);

        // fetch discounted games
        const discountGames = await fetchGamesOnDiscount();
        setDiscountGames(discountGames);

        // fetch top seller 
        const topSeller = await fetchTopSellingGames();
        setTopSellers(topSeller);

      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        width: '80%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Discounts" {...a11yProps(0)} style={{ backgroundColor: '#263C52', color: 'white' }} />
          <Tab label="Most Liked Games" {...a11yProps(1)} style={{ backgroundColor: '#263C52', color: 'white' }} />
          <Tab label="Most Common Genre" {...a11yProps(2)} style={{ backgroundColor: '#263C52', color: 'white' }} />
          <Tab label="Top Seller" {...a11yProps(3)} style={{ backgroundColor: '#263C52', color: 'white' }} />


        </Tabs>
      </AppBar>
       <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        
        <TabPanel value={value} index={0} dir={theme.direction}>
        {discountGames.map((discount) => (
          <Box m={2}>
          <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 1000,
            flexGrow: 1,
            backgroundColor: '#171D25',
            opacity: '80%',
            height: '100',
            color: '#ffffff'
          }}
        >
          <Grid container spacing={3}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={discount.header_image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 'bold' }}>
                     <ListItemIcon>
                        <ThumbUpIcon style={{ color: 'white' }} /> 
                      </ListItemIcon>
                    RECOMMENDED
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {discount.short_description}
                  </Typography>
                </Grid>
                <Grid item xs container direction="row" spacing={2}>
                <Grid item>
                  <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'grey', fontSize: 16 }}>
                    ${discount.price}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" sx={{ color: '#4cbb17', fontSize: 17 , fontWeight: 'bold' }}>
                    ${discount.discounted_price}
                  </Typography>
                </Grid>
              </Grid>
              </Grid>
              <Grid item>
                {discount.windows && (
                <IconButton color="primary" aria-label="windows">
                  <WindowIcon />
                </IconButton>
                )}
                {discount.mac && (
                <IconButton color="primary" aria-label="apple">
                  <AppleIcon />
                </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        </Box>
        ))}
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {mostLikedData.map((game) => (
              <Card key={game.name} sx={{ width: '28%', marginBottom: '30px', borderColor: '#171D25' }}>
                <CardOverflow >
                  <AspectRatio ratio="2">
                    <img
                      src={game.header_image}
                      alt={game.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}

                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography sx={{ fontSize: 16 }}>{game.name}</Typography>
                </CardContent>
                <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                  <Divider inset="context" />
                  <CardContent orientation="horizontal">
                    <Typography sx={{ fontSize: 15, color: '#069000', fontWeight: 'bold' }}>
                      ${game.price}
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography sx={{ fontSize: 14 }}>
                      User Votes: {game.positive}
                    </Typography>
                  </CardContent>
                </CardOverflow>
              </Card>
            ))}
            </div>
         
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div style={{ height: 500, width: '100%', margin: 'auto', backgroundColor: 'white', opacity: '90%'}}>
            <DataGrid
              rows={genreData}
              columns={columns}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'totalPlaytime', sort: 'desc' }],
                },
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
            />
          </div>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <Typography variant="h5" sx = {{ color: 'white', fontWeight: 'bold' }}>
            Top Selling games
          </Typography>
          {topSeller.map((top) => (
           <Box m={2}>
          <Card orientation="horizontal" variant="outlined" sx={{ width: 1000, height: 60, borderColor: '#171D25', bgcolor: '#171D25', opacity: '90%', color: 'white' }}>
            <CardOverflow>
              <AspectRatio ratio="2" sx={{ width: 180 }}>
                <img
                  src= {top.header_image}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography>
                {top.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>{top.release_date}</Typography>
            </CardContent>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.2,
                writingMode: 'vertical-rl',
                textAlign: 'center',
                fontSize: 'xs',
                fontWeight: 'xl',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderLeft: '1px solid',
                borderColor: 'divider',
              }}
            >
              Ticket
            </CardOverflow>
          </Card>
          </Box>
          ))}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
