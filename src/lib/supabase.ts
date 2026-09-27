import { createClient } from "@supabase/supabase-js"; // esta es una funcion que crea el cliente de conexion a supabase
import "react-native-url-polyfill/auto"; //agrega a react native funciones para procesar direcciones URL

const supabaseUrl = "https://ovvkjiiczdwolfytfeor.supabase.co"; //"TU_URL_DE_SUPABASE"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92dmtqaWljemR3b2xmeXRmZW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMjQwMzUsImV4cCI6MjEwNTYwMDAzNX0.PeBePpFFpFMlC5Xl6HlcqS80A0UM_g1CozXEMk15dMk"; //"TU_CLAVE_PUBLICA"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);
