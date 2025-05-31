// BuscarCategorias.jsx
import { Box, Grid, Text } from "@chakra-ui/react";
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
  { nombre: "Placas de Video",    icono: PlacasIcon },
  { nombre: "Motherboards",    icono: MotherboardsIcon },
  { nombre: "Teclados",             icono: TecladosIcon },
  { nombre: "Auriculares",       icono: AuricularesIcon },
  { nombre: "Gabinetes",        icono: GabinetesIcon },
  { nombre: "Monitores",       icono: MonitoresIcon },
  { nombre: "Procesadores",          icono: ProcesadoresIcon },
  { nombre: "Mouses",                icono: MousesIcon },
  { nombre: "Almacenamientos",       icono: AlmacenamientosIcon },
  { nombre: "Memorias RAM",           icono: MemoriasRAMIcon },
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
        {categorias.map((cat) => (
          <CategoryButton
            key={cat.nombre}
            name={cat.nombre}
            image={cat.icono}
            onClick={() => console.log("Clicked", cat.nombre)}
          />
        ))}
      </Grid>
    </Box>
  );
}