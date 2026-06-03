PS C:\Users\azag\projet-docker> docker volume create todo-logs
todo-logs
PS C:\Users\azag\projet-docker> docker run -it --name todo-writer -v todo-logs:/data node:22-alpine sh*
Unable to find image 'node:22-alpine' locally
22-alpine: Pulling from library/node
b6816b6a0419: Pull complete
2ad77fb7cfd3: Pull complete
35cf660f63b0: Pull complete
3e7ca773cb61: Download complete
32e2c9b279ac: Download complete
Digest: sha256:968df39aedcea65eeb078fb336ed7191baf48f972b4479711397108be0966920
Status: Downloaded newer image for node:22-alpine
node:internal/modules/cjs/loader:1433
  throw err;
  ^

Error: Cannot find module '/sh*'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1430:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1040:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1045:22)
    at Function._load (node:internal/modules/cjs/loader:1216:25)
    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
    at node:internal/main/run_main_module:36:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v22.22.3

What's next:
    Debug this container error with Gordon → docker ai "help me fix this container error"
PS C:\Users\azag\projet-docker> docker run -it --name todo-writer -v todo-logs:/data node:22-alpine sh

What's next:
    Debug this container error with Gordon → docker ai "help me fix this container error"
docker: Error response from daemon: Conflict. The container name "/todo-writer" is already in use by container "08c1b66df0e096332ea5d7e87b4eecb2935faedccc74a7d5f1ab69df8917e75c". You have to remove (or rename) that container to be able to reuse that name.

Run 'docker run --help' for more information
PS C:\Users\azag\projet-docker> docker run -it --name todo-writer -v todo-logs:/data node:22-alpine sh

What's next:
    Debug this container error with Gordon → docker ai "help me fix this container error"
docker: Error response from daemon: Conflict. The container name "/todo-writer" is already in use by container "08c1b66df0e096332ea5d7e87b4eecb2935faedccc74a7d5f1ab69df8917e75c". You have to remove (or rename) that container to be able to reuse that name.

Run 'docker run --help' for more information
PS C:\Users\azag\projet-docker> docker rm todo-writer
todo-writer
PS C:\Users\azag\projet-docker> docker run -it --name todo-writer -v todo-logs:/data node:22-alpine sh
/ # cd /data
/data # echo "mon premier log" > first_log.log
/data # echo "mon second log" > second_log.log
/data # exit
PS C:\Users\azag\projet-docker> docker run -it --name todo-reader -v todo-logs:/data node:22-alpine sh
/ # cat /data/first_log.log
mon premier log
/ # cat /data/second_log.log
mon second log
/ # exitdocker rm todo-writer todo-reader
PS C:\Users\azag\projet-docker> docker rm todo-writer todo-reader
todo-writer
Error response from daemon: cannot remove container "todo-reader": container is running: stop the container before removing or force remove
PS C:\Users\azag\projet-docker> docker rm -f todo-writer todo-reader
Error response from daemon: No such container: todo-writer
todo-reader
PS C:\Users\azag\projet-docker> docker run -it --name todo-verify -v todo-logs:/data node:22-alpine sh
/ # cat /data/first_log.log
mon premier log
/ # cat /data/second_log.log
mon second log
/ # exit










EXO2




PS C:\Users\azag> cd projet-docker
PS C:\Users\azag\projet-docker> docker compose down
[+] down 3/3
 ✔ Container projet-docker-api-1 Removed                                                                            2.0s
 ✔ Container projet-docker-db-1  Removed                                                                            0.7s
 ✔ Network projet-docker_default Removed                                                                            0.3s
PS C:\Users\azag\projet-docker> docker compose up -d
[+] up 3/3
 ✔ Network projet-docker_default Created                                                                            0.1s
 ✔ Container projet-docker-db-1  Started                                                                            1.1s
 ✔ Container projet-docker-api-1 Started                                                                            1.3s

What's next:
    Filter, search, and stream logs from all your Compose services
    in one place with Docker Desktop's Logs view. docker-desktop://dashboard/logs?appId=projet-docker
PS C:\Users\azag\projet-docker> curl http://localhost:3000/api/tasks

Avertissement de sécurité : risque d’exécution de script
Invoke-WebRequest analyse le contenu de la page web. Il se peut que le code de script de la page web s’exécute lors de
l’analyse de la page.
      ACTION RECOMMANDÉE :
      Utilisez le commutateur -UseBasicParsing pour éviter l’exécution du code de script.

      Voulez-vous continuer ?

[O] Oui  [T] Oui pour tout  [N] Non  [U] Non pour tout  [S] Suspendre  [?] Aide (la valeur par défaut est « N ») : oui


StatusCode        : 200
StatusDescription : OK
Content           : [{"id":"48ba43a5-cd3e-4095-a45c-890f1825de78","title":"Ma premiere tache","description":"Tester la
                    persistance","status":"todo","created_at":"2026-06-03T12:25:43.076Z","updated_at":"2026-06-03T12:25
                    :4...
RawContent        : HTTP/1.1 200 OK
                    Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https:
                    data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src
                    's...
Forms             : {}
Headers           : {[Content-Security-Policy, default-src 'self';base-uri 'self';font-src 'self' https:
                    data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src
                    'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests],
                    [Cross-Origin-Opener-Policy, same-origin], [Cross-Origin-Resource-Policy, same-origin],
                    [Origin-Agent-Cluster, ?1]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 209



PS C:\Users\azag\projet-docker>






