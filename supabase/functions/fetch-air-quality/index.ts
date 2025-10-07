import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lat, lng } = await req.json()
    
    if (!lat || !lng) {
      throw new Error('Latitude and longitude are required')
    }

    const radius = 25000 // 25km radius
    const url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lng}&radius=${radius}&limit=100`
    
    console.log('Fetching air quality data for:', { lat, lng })
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`OpenAQ API error: ${response.status}`)
    }

    const data = await response.json()
    
    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error in fetch-air-quality:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        results: [] 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  }
})
