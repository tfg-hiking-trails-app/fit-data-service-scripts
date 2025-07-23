dg = db.getSiblingDB('fit_data_service');

if (!db.getCollectionNames().includes('coordinates')) {
    db.createCollection('coordinates', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["hiking_trail_code", "points"],
                additionalProperties: false,
                properties: {
                    hiking_trail_code: {
                        bsonType: "string",
                        description: "Unique identifier for the hiking trail in the HikingTrailService database. Must be a string and is required."
                    },
                    points: {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: ["longitude", "latitude", "elevation"],
                            additionalProperties: false,
                            properties: {
                                longitude: {
                                    bsonType: "double",
                                    minimum: -180,
                                    maximum: 180,
                                    description: "Longitude of the point. Must be a double and is required."
                                },
                                latitude: {
                                    bsonType: "double",
                                    minimum: -90,
                                    maximum: 90,
                                    description: "Latitude of the point. Must be a double and is required."
                                },
                                elevation: {
                                    bsonType: "double",
                                    minimum: 0,
                                    description: "must be a double and is required"
                                },
                                timestamp: {
                                    bsonType: ["date", "null"],
                                    description: "Timestamp of the point. Must be a date and is optional."
                                }
                            }
                        },
                        description: "Array of points with location and elevation. Each point must have a longitude, latitude and an elevation."
                    }
                }
            }
        }
    });

    db.coordinates.createIndex(
        { "location": "2dsphere" },
        { "name": "location_2dsphere_index" }
    );
    db.coordinates.createIndex(
        { "hiking_trail_code": 1 },
        { "name": "hiking_trail_code_index", unique: true }
    );
}