/** */

export default class CatchPyAdapter {
    /** */
    constructor(canvasId, endpointUrl, userId, userName, platformName, contextId, collectionId, jwt, context="http://catchpy.harvardx.harvard.edu.s3.amazonaws.com/jsonld/catch_context_jsonld.json", schemaVersion="1.2.0") {
      this.canvasId = canvasId;
      this.endpointUrl = endpointUrl;
      this.jwt = jwt;
      this.userId = userId;
      this.userName = userName;
      this.platformName = platformName;
      this.contextId = contextId;
      this.collectionId = collectionId;
      this.context = context;
      this.schemaVersion = schemaVersion;
    }
  
    get annotationPageId() {
      return `${this.endpointUrl}/pages?uri=${this.canvasId}`;
    }

    createPayload(annotation){
      return {
        "id": annotation.id,
        "@context": this.context,
        "type": "Annotation",
        "schema_version": this.schemaVersion,
        "creator": {
          "id": this.userId,
          "name": this.userName 
        },
        "permissions": {
          "can_read": [],
          "can_update": [this.userId],
          "can_delete": [this.userId],
          "can_admin": [this.userId]
        },
        "platform": {
          "platform_name": this.platformName,   
          "context_id": this.contextId,  
          "collection_id": this.collectionId,
          "target_source_id": this.canvasId
        },
        "body": {
          "type": "List",
          "items": [{
            "type": annotation.body.type,
            "format": "text/html",
            "value": annotation.body.value,
            "purpose": annotation.motivation
          }]
        },
        "target": {
          "type": "List",
          "items": [
            {
              "source": this.canvasId,
              "type": "Image",
              "selector": {
                "type": "Choice",
                "items": annotation.target.selector
              }
            }
          ]
        }
      };
    }
  
    async create(annotation) {
      console.log(annotation);
      return fetch(`${this.endpointUrl}/annos/`, {
        body: JSON.stringify(this.createPayload(annotation)),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.jwt}`
        },
        method: 'POST',
      })
      .then((response) => console.log(response))
      .then((response) => this.all())
      .catch(() => this.all());
    }
  
    async update(annotation) {
      return fetch(`${this.endpointUrl}/annos/${encodeURIComponent(annotation.id)}`, {
        body: JSON.stringify(this.createPayload(annotation)),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.jwt}`
        },
        method: 'PUT',
      })
        .then((response) => this.all())
        .catch(() => this.all());
    }
  
    async delete(annoId) {
      return fetch(`${this.endpointUrl}/annos/${encodeURIComponent(annoId)}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.jwt}`
        },
        method: 'DELETE',
      })
        .then((response) => this.all())
        .catch(() => this.all());
    }
  
    async get(annoId) {
      return (await fetch(`${this.endpointUrl}/annos/${encodeURIComponent(annoId)}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.jwt}`
        },
      })).json();
    }
  
    async all() {
      let params = {
        limit: -1,
        "source_id": this.canvasId,
        "platform": this.platformName
      }
      let queryString = '';
      for(let key in params){
        queryString += `&${key}=${params[key]}`;
      }
      const res = await fetch(`${this.endpointUrl}/annos/?${queryString}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.jwt}`
        },
        method: 'GET',
      });
      let annos = await res.json();
      return this.createAnnotationPage(annos);
    }

    // TODO: match this to schema better
    formatAnnotation(item){
      let bound = null;
      item.target.items.forEach((b) => {
        if(b.type == "Image"){
            bound = b;
        }
      })
      return {
        "body": {
          "type": item.body.items[0].type,
          "value": item.body.items[0].value
        },
        "id": item.id,
        "motivation": item.body.items[0].purpose,
        "target": {
          "source": bound.source,
          "selector": bound.selector.items
        },
        "type": item.type
      }
    }

    /** Creates an AnnotationPage from a list of annotations */
    createAnnotationPage(annos) {
      let formattedAnnos = [];
      annos.rows.forEach((anno) => formattedAnnos.push(this.formatAnnotation(anno)));
      if (Array.isArray(formattedAnnos)) {
        return {
          id: this.annotationPageId,
          items: formattedAnnos,
          type: 'AnnotationPage',
        };
      }
      return annos;
    }

  }
  
  // What does Mirador Annotation expect to be returned - format all() to give us that
  /**
{
    "id": "localStorage://?canvasId=https://iiif.harvardartmuseums.org/manifests/object/195903/canvas/canvas-20411130",
    "items": [
        {
            "body": {
                "type": "TextualBody",
                "value": "<p>Local anno</p>"
            },
            "id": "01dab290-f447-4fb1-93dd-794a177034de",
            "motivation": "commenting",
            "target": {
                "source": "https://iiif.harvardartmuseums.org/manifests/object/195903/canvas/canvas-20411130",
                "selector": [
                    {
                        "type": "FragmentSelector",
                        "value": "xywh=1401,135,566,533"
                    },
                    {
                        "type": "SvgSelector",
                        "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M1401.8392,669.59296v-533.90452h566.35176v533.90452z\" data-paper-data=\"{&quot;state&quot;:null}\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
                    }
                ]
            },
            "type": "Annotation"
        },
        {
            "body": {
                "type": "TextualBody",
                "value": "<p>Another</p>"
            },
            "id": "55644098-ff19-4a4f-8647-7268b269a7df",
            "motivation": "commenting",
            "target": {
                "source": "https://iiif.harvardartmuseums.org/manifests/object/195903/canvas/canvas-20411130",
                "selector": [
                    {
                        "type": "FragmentSelector",
                        "value": "xywh=531,351,191,330"
                    },
                    {
                        "type": "SvgSelector",
                        "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M531.66332,681.39196v-330.37186h191.73367v330.37186z\" data-paper-data=\"{&quot;state&quot;:null}\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
                    }
                ]
            },
            "type": "Annotation"
        }
    ],
    "type": "AnnotationPage"
}
**/