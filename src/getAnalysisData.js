export function getAnalysisData(endpoint, uuid){
  fetch(endpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      query: `{
        query {
          analysisByUuid($uuid: String){
            uuid
            description
            visiblecolorSet {
              uuid
              color {
                name
                hexCode
                hexCodeLeftGradient
                hexCodeRightGradient
              }
              description
              substrate
              visiblecolorpigmentSet {
                pigment {
                  name
                }
              }
              visiblecoloranalysismethodologySet {
                uuid
                locationDescription
                analysisPoint
                analysisMethodology {
                  name
                  acronym
                }
                visibleColor {
                  color {
                    name
                  }
                }
              }
            }
          }
        }
      }`,
      variables: {
        "uuid": uuid
      }
    })
  })
  .then((res) => res.json())
}
