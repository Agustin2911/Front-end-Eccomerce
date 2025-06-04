// BuscarCategorias.jsx
import { Box, Grid, Text,} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CategoryButton from "./CategoryButton";

import PlacasIcon       from "../assets/Grafica.svg";
import MotherboardsIcon       from "../assets/motherboards.svg";
import TecladosIcon       from "../assets/Teclados.svg";
import ProcesadoresIcon from "../assets/Procesadores.svg";
import AuricularesIcon  from "../assets/auriculares.svg";
import MemoriasRAMIcon     from "../assets/RAM.svg";
import MonitoresIcon    from "../assets/monitores.svg";
import AlmacenamientosIcon          from "../assets/Almacenamientos.svg";
import GabinetesIcon from "../assets/Gabinete.svg";
import MousesIcon     from "../assets/Mouses.svg";

const categorias = [
  { nombre: "Placas de Video",    icono: PlacasIcon, categoryId: 2 },
  { nombre: "Motherboards",    icono: MotherboardsIcon, categoryId: 4 },
  { nombre: "Teclados",             icono: TecladosIcon, categoryId: 7 },
  { nombre: "Auriculares",       icono: AuricularesIcon, categoryId: 9 },
  { nombre: "Gabinetes",        icono: GabinetesIcon, categoryId: 4, subCategoryId: 11, },
  { nombre: "Monitores",       icono: MonitoresIcon, categoryId: 14 },
  { nombre: "Procesadores",          icono: ProcesadoresIcon, categoryId: 3 },
  { nombre: "Mouses",                icono: MousesIcon, categoryId: 8 },
  { nombre: "Almacenamientos",       icono: AlmacenamientosIcon, categoryId: 5  },
  { nombre: "Memorias RAM",           icono: MemoriasRAMIcon, categoryId: 6 },
];

export default function Categorys() {
  return (
    <Box as="section" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        textAlign="center"
        mb={8}
        color = "#F1E6F7"
      >
        ¿Qué estás buscando?
      </Text>

      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
        gap={4}
        _hover={{ 
          "& > *:not(:hover)": {
            filter: "blur(3px)",
            transition: "filter 0.4s ease",
          },
        }}
        
      >
        {categorias.map((cat) => {
          // Armamos la URL según tenga subCategoryId o no:
          const to = cat.subCategoryId
            ? `/products/subCategory/${cat.subCategoryId}`
            : `/products/category/${cat.categoryId}`;

          return (
            <Link
              key={cat.nombre}
              to={to}
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "none")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              <CategoryButton
                name={cat.nombre}
                image={cat.icono}
              />
            </Link>
          );
        })}
      </Grid>
    </Box>
  );
}