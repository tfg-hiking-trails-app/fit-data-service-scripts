dg = db.getSiblingDB("fit_data_service");

if (!db.getCollectionNames().includes("fit_file_data")) {
  db.createCollection("fit_file_data", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "hiking_trail_code",
          "file_id",
          "activity",
          "session",
          "records",
        ],
        additionalProperties: false,
        properties: {
					_id: {
						bsonType: "objectId",
						description: "Identificador único del documento"
					},
          hiking_trail_code: {
            bsonType: "string",
            description: "Identificador único de la ruta de senderismo en la base de datos HikingTrailService. Debe ser una cadena de caracteres y es obligatorio.",
          },
          file_id: {
            bsonType: "object",
						required: ["type"],
            description:
              "El mensaje de ID de archivo es obligatorio para todos los tipos de archivo FIT y se espera que sea el primer mensaje del archivo. Para los archivos de actividad, la propiedad Tipo debe establecerse en 4. El orden del mensaje de ID de archivo en el archivo y la propiedad Tipo ayudan a identificar rápidamente el tipo de archivo antes de decodificarlo por completo. El mensaje de ID de archivo también contiene el ID del fabricante y el ID del producto del dispositivo o la plataforma que lo creó. Garmin asigna los ID de fabricante y cada fabricante define su propia lista de ID de producto. El SDK de FIT incluye una lista de ID de fabricante y una lista de ID de producto de Garmin.",
            properties: {
              type: {
								bsonType: "int",
								description: "Tipo de archivo",
							},
							manufacturer: {
								bsonType: ["int", "null"],
								description: "Identificador del fabricante",
							},
							product: {
								bsonType: ["int", "null"],
								description: "Identificador del producto",
							},
							faveroProduct: {
								bsonType: ["int", "null"],
								description: "Identificador de producto Favero",
							},
							garminProduct: {
								bsonType: ["int", "null"],
								description: "Identificador de producto Garmin",
							},
							serialNumber: {
								bsonType: ["long", "null"],
								description: "Número de serie",
							},
							timeCreated: {
								bsonType: ["date", "null"],
								description: "Fecha de creación",
							},
							number: {
								bsonType: ["int", "null"],
								description: "Número asociado al archivo",
							},
							productName: {
								bsonType: ["string", "null"],
								description: "Nombre del producto",
							}
            }
          },
          activity: {
            bsonType: "object",
            description: "Se requiere un solo mensaje de actividad en un archivo de actividad FIT. Este mensaje incluye las propiedades 'Marca de tiempo local' y 'Conteo de sesiones'. La marca de tiempo local determina la diferencia horaria que se puede aplicar a todas las marcas de tiempo del archivo. La mayoría de los dispositivos graban archivos FIT en tiempo real, y el conteo de sesiones se desconoce hasta el final de la grabación. Por ello, el mensaje de actividad suele ser el último del archivo. Es posible que falte si el archivo se trunca o se corrompe, por lo que se debe minimizar la dependencia del mensaje de actividad en el posprocesamiento de los archivos de actividad.",
            properties: {
							timestamp: {
								bsonType: ["date", "null"],
								description: "Marca temporal principal de la actividad",
							},
							totalTimerTime: {
								bsonType: ["double", "null"],
								description: "Tiempo total de temporizador en segundos",
							},
							numSessions: {
								bsonType: ["int", "null"],
								description: "Número de sesiones",
							},
							type: {
								bsonType: ["int", "null"],
								description: "Tipo de actividad (enum)",
							},
							event: {
								bsonType: ["int", "null"],
								description: "Tipo de evento (enum)",
							},
							eventType: {
								bsonType: ["int", "null"],
								description: "Tipo específico de evento (enum)",
							},
							localTimestamp: {
								bsonType: ["date", "null"],
								description: "Marca temporal local",
							},
							eventGroup: {
								bsonType: ["int", "null"],
								description: "Grupo de eventos",
							}
            }
          },
          session: {
            bsonType: "array",
            description: "Los archivos de actividad contendrán uno o más mensajes de sesión. Un mensaje de sesión es un mensaje de resumen. La hora de inicio, el tiempo total transcurrido, el tiempo total del temporizador y la marca de tiempo son campos obligatorios para todos los mensajes de resumen. Los mensajes de sesión definen casi 150 campos que pueden proporcionar información relacionada con la actividad. Esto incluye la hora de inicio; el tipo de deporte y subdeporte; valores de resumen como la duración total, la distancia y el desnivel positivo; la longitud de la piscina; la ubicación de inicio; y el cuadro delimitador del GPS. Los mensajes de sesión suelen contener un subconjunto de estos campos en función de si se utilizó una función específica del dispositivo, el tipo de deporte y los sensores utilizados durante la grabación de la actividad. Cuando un usuario participa en una actividad multideportiva, los datos de resumen de cada etapa de la actividad, incluidas las transiciones, se almacenarán en mensajes de sesión separados dentro del mismo archivo de actividad.",
            items: {
              bsonType: "object",
              properties: {
								messageIndex: {
									bsonType: ["int", "null"],
									description: "Índice del mensaje",
								},
								timestamp: {
									bsonType: "date",
									description: "Marca temporal principal",
								},
								event: {
									bsonType: ["int", "null"],
									description: "Evento de la sesión"
								},
								eventType: {
									bsonType: ["int", "null"],
									description: "Tipo de evento"
								},
								startTime: {
									bsonType: "date",
									description: "Hora de inicio de la sesión",
								},
								startPositionLat: {
									bsonType: ["int", "double", "null"],
									description: "Latitud inicial (semicircles)",
								},
								startPositionLong: {
									bsonType: ["int", "double", "null"],
									description: "Longitud inicial (semicircles)",
								},
								sport: {
									bsonType: ["int", "null"],
									description: "Deporte principal"
								},
								subSport: {
									bsonType: ["int", "null"],
									description: "Subdeporte"
								},
								totalElapsedTime: {
									bsonType: "double",
									description: "Tiempo total transcurrido (s)",
								},
								totalTimerTime: {
									bsonType: "double",
									description: "Tiempo total de cronómetro (s)",
								},
								totalDistance: {
									bsonType: ["double", "null"],
									description: "Distancia total (m)",
								},
								totalCycles: {
									bsonType: ["long", "null"],
									description: "Total de ciclos (pedaladas, zancadas, brazadas...)",
								},
								totalStrides: {
									bsonType: ["long", "null"],
									description: "Total de zancadas",
								},
								totalStrokes: {
									bsonType: ["long", "null"],
									description: "Total de brazadas",
								},
								totalCalories: {
									bsonType: ["int", "null"],
									description: "Calorías totales",
								},
								totalFatCalories: {
									bsonType: ["int", "null"],
									description: "Calorías de grasa",
								},
								avgSpeed: {
									bsonType: ["double", "null"],
									description: "Velocidad media (m/s)",
								},
								maxSpeed: {
									bsonType: ["double", "null"],
									description: "Velocidad máxima (m/s)",
								},
								avgHeartRate: {
									bsonType: ["int", "null"],
									description: "Frecuencia cardíaca media (lpm)",
								},
								maxHeartRate: {
									bsonType: ["int", "null"],
									description: "Frecuencia cardíaca máxima (lpm)",
								},
								minHeartRate: {
									bsonType: ["int", "null"],
									description: "Frecuencia cardíaca mínima (lpm)",
								},
								avgCadence: {
									bsonType: ["int", "null"],
									description: "Cadencia media"
								},
								avgRunningCadence: {
									bsonType: ["int", "null"],
									description: "Cadencia media de carrera",
								},
								maxCadence: {
									bsonType: ["int", "null"],
									description: "Cadencia máxima"
								},
								maxRunningCadence: {
									bsonType: ["int", "null"],
									description: "Cadencia máxima de carrera",
								},
								avgPower: {
									bsonType: ["int", "null"],
									description: "Potencia media (W)",
								},
								maxPower: {
									bsonType: ["int", "null"],
									description: "Potencia máxima (W)",
								},
								totalAscent: {
									bsonType: ["int", "null"],
									description: "Ascenso total (m)",
								},
								totalDescent: {
									bsonType: ["int", "null"],
									description: "Descenso total (m)",
								},
								avgAltitude: {
									bsonType: ["double", "null"],
									description: "Altitud media (m)",
								},
								maxAltitude: {
									bsonType: ["double", "null"],
									description: "Altitud máxima (m)",
								},
								minAltitude: {
									bsonType: ["double", "null"],
									description: "Altitud mínima (m)",
								},
								totalTrainingEffect: {
									bsonType: ["double", "null"],
									description: "Training Effect total",
								},
								firstLapIndex: {
									bsonType: ["int", "null"],
									description: "Índice de la primera vuelta",
								},
								numLaps: {
									bsonType: ["int", "null"],
									description: "Número de vueltas"
								},
								eventGroup: {
									bsonType: ["int", "null"],
									description: "Grupo de evento"
								},
								trigger: {
									bsonType: ["int", "null"],
									description: "Trigger de la sesión",
								},
								necLat: {
									bsonType: ["int", "double", "null"],
									description: "NEC Lat",
								},
								necLong: {
									bsonType: ["int", "double", "null"],
									description: "NEC Long",
								},
								swcLat: {
									bsonType: ["int", "double", "null"],
									description: "SWC Lat"
								},
								swcLong: {
									bsonType: ["int", "double", "null"],
									description: "SWC Long"
								},
								numLengths: {
									bsonType: ["int", "null"],
									description: "Número de largos (natación)",
								},
								normalizedPower: {
									bsonType: ["int", "null"],
									description: "Potencia normalizada",
								},
								trainingStressScore: {
									bsonType: ["double", "null"],
									description: "Training Stress Score",
								},
								intensityFactor: {
									bsonType: ["double", "null"],
									description: "Intensity Factor",
								},
								leftRightBalance: {
									bsonType: ["int", "null"],
									description: "Balance izquierda/derecha",
								},
								endPositionLat: {
									bsonType: ["int", "double", "null"],
									description: "Latitud final",
								},
								endPositionLong: {
									bsonType: ["int", "double", "null"],
									description: "Longitud final",
								}
              }
            },
          },
          lap: {
            bsonType: "array",
            description: "Los mensajes de vuelta representan vueltas o intervalos dentro de la sesión. Un mensaje de vuelta es un mensaje de resumen. Los campos Hora de inicio, Tiempo total transcurrido, Tiempo total del cronómetro y Marca de tiempo son obligatorios para todos los mensajes de resumen. Un archivo de actividad debe contener al menos un mensaje de vuelta por cada mensaje de sesión, pero probablemente contendrá varios mensajes de vuelta por cada mensaje de sesión que representen diferentes intervalos de tiempo o distancia. Las vueltas pueden ser marcadas manualmente por el usuario o automáticamente por el dispositivo de grabación. Los mensajes de vuelta deben ser secuenciales y no solaparse, y la suma de los valores totales de tiempo y distancia transcurridos de todos los mensajes de vuelta debe ser igual al tiempo y distancia transcurridos totales del mensaje de sesión correspondiente.",
            items: {
              bsonType: "object",
              properties: {
								timestamp: {
									bsonType: "date",
									description: "Marca temporal principal de la vuelta"
								},
								start_time: {
									bsonType: ["date", "null"],
									description: "Hora de inicio de la vuelta"
								},
								total_elapsed_time: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Tiempo total transcurrido de la vuelta en segundos"
								},
								total_timer_time: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Tiempo total del cronómetro de la vuelta en segundos"
								},
								total_distance: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Distancia total de la vuelta en metros"
								},
								total_calories: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Calorías totales de la vuelta"
								},
								avg_speed: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Velocidad media de la vuelta en m/s"
								},
								max_speed: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Velocidad máxima de la vuelta en m/s"
								},
								avg_heart_rate: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Frecuencia cardíaca media de la vuelta en bpm"
								},
								max_heart_rate: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Frecuencia cardíaca máxima de la vuelta en bpm"
								},
								avg_cadence: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Cadencia media de la vuelta en rpm"
								},
								max_cadence: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Cadencia máxima de la vuelta en rpm"
								},
								avg_power: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Potencia media de la vuelta en vatios"
								},
								max_power: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Potencia máxima de la vuelta en vatios"
								},
								total_ascent: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Ascenso total de la vuelta en metros"
								},
								total_descent: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Descenso total de la vuelta en metros"
								},
								intensity: {
									bsonType: ["int", "null"],
									description: "Intensidad de la vuelta"
								},
								lap_trigger: {
									bsonType: ["int", "null"],
									description: "Disparador de vuelta"
								},
								sport: {
									bsonType: ["int", "null"],
									description: "Tipo de deporte"
								},
								avg_temperature: {
									bsonType: ["double", "null"],
									description: "Temperatura media de la vuelta en grados Celsius"
								},
								max_temperature: {
									bsonType: ["double", "null"],
									description: "Temperatura máxima de la vuelta en grados Celsius"
								}
              }
            }
          },
          records: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["timestamp"],
							description: "Los mensajes de registro almacenan en los archivos de actividad los valores de coordenadas GPS, velocidad, distancia, frecuencia cardíaca, potencia, etc., en tiempo real. Los registros contienen marcas de tiempo con una resolución de un segundo, aunque los dispositivos pueden almacenar datos a menor velocidad. Los dispositivos también pueden utilizar la técnica de Grabación Inteligente, lo que resulta en la grabación de mensajes de registro a intervalos irregulares. Los datos de los mensajes de registro se muestran comúnmente en gráficos y como recorridos en un mapa. Se requiere una marca de tiempo y al menos otro valor para cada mensaje de registro.",
              properties: {
								timestamp: {
									bsonType: "date",
									description: "Marca temporal principal del registro"
								},
								position_lat: {
									bsonType: ["int", "long", "double", "null"],
									minimum: -900000000,
									maximum: 900000000,
									description: "Latitud en semiciclos (de -90 a 90 grados, requiere conversión a grados decimales)"
								},
								position_long: {
									bsonType: ["int", "long", "double", "null"],
									minimum: -1800000000,
									maximum: 1800000000,
									description: "Longitud en semiciclos (de -180 a 180 grados, requiere conversión a grados decimales)"
								},
								altitude: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Altitud en metros"
								},
								heart_rate: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Frecuencia cardíaca en bpm"
								},
								cadence: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Cadencia en rpm"
								},
								distance: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Distancia en metros"
								},
								speed: {
									bsonType: ["double", "null"],
									minimum: 0,
									description: "Velocidad en m/s"
								},
								power: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Potencia en vatios"
								},
								temperature: {
									bsonType: ["double", "null"],
									description: "Temperatura en grados Celsius"
								},
								gps_accuracy: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Precisión GPS en metros"
								},
								calories: {
									bsonType: ["int", "null"],
									minimum: 0,
									description: "Calorías quemadas"
								},
								vertical_speed: {
									bsonType: ["double", "null"],
									description: "Velocidad vertical en m/s"
								}
              }
            },
          },
        },
      },
    },
  });

  db.fit_file_data.createIndex(
    { hiking_trail_code: 1 },
    { name: "hiking_trail_code_index", unique: true }
  );
}
