# Aplicativo Pokémon

## Visão Geral

Bem-vindo ao Aplicativo Pokémon! Este projeto é uma aplicação web que permite aos usuários navegar e pesquisar por Pokémon. Ele fornece informações detalhadas sobre cada Pokémon, incluindo seus tipos, habilidades e movimentos. Os usuários também podem alternar entre temas claro e escuro para uma experiência personalizada.

## Funcionalidades

- **Pesquisar Pokémon**: Pesquise por Pokémon pelo nome e filtre por tipo.
- **Informações Detalhadas**: Veja informações detalhadas sobre cada Pokémon, incluindo habilidades e movimentos.
- **Rolagem Infinita**: Carregue mais Pokémon à medida que você rola para baixo ou clica no botão "Carregar Mais".
- **Tema Claro/Escuro**: Alterne entre temas claro e escuro.
- **Design Responsivo**: Design responsivo e compatível com dispositivos móveis.

## Demonstração

### Desktop

![Demonstração Desktop](./src/design/Desktop-pokedex.gif)

### Mobile

![Demonstração Mobile](./src/design/Mobile-pokedex.gif)

Confira a demonstração ao vivo: [Demonstração do Aplicativo Pokémon](https://projeto-pokedex-pi.vercel.app/)

## Instalação

Para começar com o Aplicativo Pokémon, siga estas etapas:

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/carlosvfb/pokemon-app.git
    cd pokemon-app
    ```

2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4. Abra o seu navegador e navegue até `http://localhost:3000`.

## Uso

### Pesquisando Pokémon

1. Use a barra de pesquisa no cabeçalho para inserir o nome de um Pokémon.
2. Filtre Pokémon por tipo usando o menu suspenso.
3. Clique em um Pokémon para ver informações detalhadas.

### Carregando Mais Pokémon

1. Role para baixo até o final da página ou clique no botão "Carregar Mais" para carregar mais Pokémon.
2. Se o campo de pesquisa estiver vazio, o botão "Carregar Mais" ficará visível e carregará mais 10 Pokémon por vez.
3. Se o campo de pesquisa não estiver vazio, o botão "Carregar Mais" será oculto.

### Temas

1. Alterne entre temas claro e escuro usando o interruptor no cabeçalho.
2. O tema será aplicado globalmente em toda a aplicação.

### Arquivos e Diretórios Principais

- **components/**: Contém componentes reutilizáveis, como o cabeçalho, spinner de carregamento, itens de Pokémon e lista de Pokémon.
- **routes/**: Contém componentes específicos de rotas, como a página de detalhes do Pokémon.
- **server/**: Contém a lógica do lado do servidor para buscar dados de Pokémon.
- **theme/**: Contém arquivos relacionados ao tema, incluindo definições de tema e contexto.
- **App.js**: Componente principal da aplicação.
- **index.js**: Ponto de entrada da aplicação.

## Tecnologias Utilizadas

- **React**: Uma biblioteca JavaScript para construção de interfaces de usuário.
- **Styled-components**: Para estilização dos componentes.
- **React Router**: Para gerenciamento de rotas na aplicação.
- **Prop-types**: Para verificação de tipos de propriedades.
- **Axios**: Para fazer requisições HTTP à API de Pokémon.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir, por favor, faça um fork do repositório e use um branch de funcionalidade. Pull requests são bem-vindos.

1. **Faça um fork do repositório**
2. **Crie um branch de funcionalidade:**
    ```bash
    git checkout -b nome-da-funcionalidade
    ```
3. **Commit suas alterações:**
    ```bash
    git commit -m 'Adicione alguma funcionalidade'
    ```
4. **Push para o branch:**
    ```bash
    git push origin nome-da-funcionalidade
    ```
5. **Crie um novo Pull Request**

## Licença

Este projeto está licenciado sob a Licença MIT.

## Agradecimentos

- [PokéAPI](https://pokeapi.co/): A API de Pokémon usada para buscar dados dos Pokémon.
- [React](https://reactjs.org/): A biblioteca usada para construir a interface de usuário.
- [Styled-components](https://styled-components.com/): Para estilização da aplicação.

## Autor

Linkedin - [Carlos Vítor Faria Barboza](https://www.linkedin.com/in/carlos-barboza-080842218)

instagram - [carlos_vfb.dev](https://www.instagram.com/carlos_vfb.dev)

## Agradecimentos

Obrigado por usar o Aplicativo Pokémon! Se você tiver alguma dúvida ou feedback, sinta-se à vontade para abrir uma issue ou me chamar nas redes sociais.

Feliz caça aos Pokémon!


# Pokémon App

## Overview

Welcome to the Pokémon App! This project is a web application that allows users to browse and search for Pokémon. It provides detailed information on each Pokémon, including their types, abilities, and moves. Users can also switch between light and dark themes for a personalized experience.

## Features

- **Search Pokémon**: Search for Pokémon by name and filter by type.
- **Detailed Information**: View detailed information about each Pokémon, including abilities and moves.
- **Infinite Scrolling**: Load more Pokémon as you scroll down or click the "Load More" button.
- **Light/Dark Theme**: Toggle between light and dark themes.
- **Responsive Design**: Mobile-friendly and responsive design.

## Demo

### Desktop

![](./src/design/Desktop-pokedex.gif)

### Mobile

![](./src/design/Mobile-pokedex.gif)

Check out the live demo: [Pokémon App Demo](https://projeto-pokedex-pi.vercel.app/)

## Installation

To get started with the Pokémon App, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/carlosvfb/pokemon-app.git

    cd pokemon-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the development server:**
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Searching for Pokémon

1. Use the search bar in the header to enter the name of a Pokémon.
2. Filter Pokémon by type using the dropdown menu.
3. Click on a Pokémon to view detailed information.

### Loading More Pokémon

1. Scroll down to the bottom of the page or click the "Load More" button to load additional Pokémon.
2. If the search input is empty, the "Load More" button will be visible and will load 10 more Pokémon at a time.
3. If the search input is not empty, the "Load More" button will be hidden.

### Theming

1. Toggle between light and dark themes using the switch in the header.
2. The theme will be applied globally across the application.


### Key Files and Directories

- **components/**: Contains reusable components like the header, loading spinner, Pokémon items, and Pokémon list.
- **routes/**: Contains route-specific components like the Pokémon detail page.
- **server/**: Contains server-side logic for fetching Pokémon data.
- **theme/**: Contains theme-related files, including theme definitions and context.
- **App.js**: Main application component.
- **index.js**: Entry point of the application.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Styled-components**: For styling components.
- **React Router**: For handling routing in the application.
- **Prop-types**: For type-checking props.
- **Axios**: For making HTTP requests to the Pokémon API.

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. **Fork the repository**
2. **Create a feature branch:**
    ```bash
    git checkout -b feature-name
    ```
3. **Commit your changes:**
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch:**
    ```bash
    git push origin feature-name
    ```
5. **Create a new Pull Request**

## License

This project is licensed under the MIT License.

## Acknowledgements

- [PokéAPI](https://pokeapi.co/): The Pokémon API used to fetch Pokémon data.
- [React](https://reactjs.org/): The library used for building the user interface.
- [Styled-components](https://styled-components.com/): For styling the application.

## Author

LinkedIn - [Carlos Vítor Faria Barboza](https://www.linkedin.com/in/carlos-barboza-080842218)

Instagram - [carlos_vfb.dev](https://www.instagram.com/carlos_vfb.dev)

## Acknowledgements

Thank you for using the Pokémon App! If you have any questions or feedback, feel free to open an issue or reach out to me on social media.

Happy Pokémon hunting!