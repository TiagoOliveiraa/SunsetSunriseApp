class SunTime < ApplicationRecord
    validates :location, :date, presence: true
    validates :date, uniqueness: {scope: :location, message: "Data already exists for this date"}

    def self.find_or_fetch(location, date_start, date_end)
        final_data = []

        (Date.parse(date_start)..Date.parse(date_end)).each do |date|

            sun_time = find_by(location: location, date: date)

            if sun_time
                final_data << organize_data(sun_time)
            else
                coord = translate_location_to_coords(location)
                if coord.present?
                    response = get_sun_data_from_api(coord, date, date)
                    if response[:success]
                        newEntry = response[:data]
                        sun_time = SunTime.create(
                            location: location,
                            sunrise_time: newEntry[:sunrise].present? ? Time.parse(newEntry[:sunrise]).strftime("%H:%M:%S") : nil,
                            sunset_time: newEntry[:sunset].present? ? Time.parse(newEntry[:sunset]).strftime("%H:%M:%S") : nil,
                            golden_hour: newEntry[:golden_hour].present? ? Time.parse(newEntry[:golden_hour]).strftime("%H:%M:%S") : nil,
                            timezone: newEntry[:timezone],
                            date: date,
                        )
                        final_data << organize_data(sun_time)
                    else 
                        return {error: response[:error], code: response[:status]}
                    end
                else
                    return {error: response[:error], code: response[:status]}
                end
            end
        end
        return final_data
    end  


    def self.organize_data(data)
        return {
            location: data.location,
            sunrise_time: data.sunrise_time.present? ? Time.parse(data.sunrise_time.to_s).strftime("%H:%M:%S") : nil,
            sunset_time: data.sunset_time.present? ? Time.parse(data.sunset_time.to_s).strftime("%H:%M:%S") : nil,
            golden_hour: data.golden_hour.present? ? Time.parse(data.golden_hour.to_s).strftime("%H:%M:%S") : nil,
            timezone: data.timezone,
            date: data.date.to_s
        }

    end

    def self.get_sun_data_from_api(location, date_start, date_end)
        gateway = SunsetApiService.new({lat: location[:lat], long:location[:long]}, date_start, date_end)
        sun_set_data = gateway.get_sun_data
        
    end

    def self.translate_location_to_coords(location)
        api_key = ENV['API_KEY']
        gateway = GeoApiService.new(location, api_key)
        response = gateway.get_coords

        if response[:success]
            return {
                lat: response[:data]["results"][0]["lat"],
                long: response[:data]["results"][0]["lon"],
            }
        else
            return response
        end
    end

end
