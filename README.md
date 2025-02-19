# **Projeto MILI - *TECH* TEST**

- **Instruções sobre este projeto, destinado ao Teste Técnico do Processo Seletivo da Mili.**
- **VÍDEO DE DEMONSTRAÇÃO: https://bit.ly/4g3nM8x**




## - 1 - *ApiProdutos**

1. Contém uma REST API feita em Spring Boot e Java 8, utilizando "Eclipse IDE for Java Developers - 2024-09". O banco de dados utilizado é o PostgreSQL com pgAdmin 4. As configurações de dependências estão no arquivo "pom.xml" e as de conexão com o banco de dados no arquivo "application.properties". A versão do Java recomendada é a versão 8.
2. Instale o PostgreSQL e o pgAdmin 4 e configure de acordo com o "application.properties". As configurações são: localhost:5432, username-postgres, password=admin, database=testemili. 
3. Para rodar o projeto, baixe o projeto "ApiProdutos" e importe como um "Maven Project" no Eclipse. Rode com "botão direito em... ApiEstudarApplication.java -> Run As... -> Java Application". E procure uma mensagem no console do Eclipse parecida com essa: "Started ApiEstudarApplication in 4.894 seconds (JVM running for 5.447)". Se você encontrar esta mensagem, quer dizer que a API está rodando.
4. Com o banco de dados criado de acordo com as informações do arquivo "application.properties" e o projeto importado e rodando no Eclipse, crie a tabela "produto" no banco de dados. Como o Hibernate/JPA está mapeado com o banco no "application.properties", basta chamar o endpoint de POST no Postman passando o JSON correto de acordo com a @Entity. Assim a tabela "produto" será criada automaticamente no banco de dados, já com todos os campos configurados e com o registro passado no JSON já inserido. Caso queira, chame um endpoint de GET no Postman após inserir um registro no banco para ver se a API está funcionando normalmente.




## - 2 - *MiliTechTest**

1. Este projeto é o front-end em Angular que contém as funcionalidades do sistema para o usuário utilizar. Este projeto consome a API presente em ApiProdutos.
2. Sistema desenvolvido com o "WebStorm", por isso é recomendado que seja rodado com ele. Mas nada impede que seja utilizado "VS Code" ou "IntelliJ".
3. Como o projeto é um sistema desenvolvido em Angular, é necessário ter o Node.js instalado em sua máquina. Então baixe o Node.js v22.12.0 no site oficial e instale.
4. É necessário setar a variável de ambiente do Node no PATH do sistema após a instalação (para ambientes Windows). O caminho para colocar no PATH normalmente é: C:\Program Files\nodejs. Após isso é necessário reiniciar o computador. 
5. Depois, abra o prompt de comando (cmd) e rode o seguinte comando: npm install -g @angular/cli
6. Isso irá instalar a última versão do Angular, o Angular CLI 19, no seu computador. O Angular CLI é necessário para rodar o framework do Angular na sua máquina. Para ver se o Angular CLI foi instalado com sucesso, rode esse comando: ng version
7. Depois, baixe o "WebStorm", de preferência "WebStorm 2024.3.1.1". Importe o projeto e rode com o comando "ng serve" no terminal do WebStorm. Ele vai pedir para instalar as bibliotecas. Aceite e instale. Após instalar, caso o sistema já não esteja rodando, dê mais uma vez o comando "ng serve".
8. Acesse o sistema pela URL: http://localhost:4200/



- ### **NOTA:**
	> Lembrando que para o sistema funcionar, a API ApiProdutos deve estar rodando e funcionando perfeitamente ( para ter certeza, utilize o Postman. ).

